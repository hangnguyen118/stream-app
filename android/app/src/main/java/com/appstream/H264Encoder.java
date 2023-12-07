package com.appstream;

import android.media.MediaCodec;
import android.media.MediaCodecInfo;
import android.media.MediaFormat;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;

import java.io.IOException;
import java.nio.ByteBuffer;

public class H264Encoder {
    private static final String TAG = "H264Encoder";
    private static final String MIME_TYPE = "video/avc";
    private static final int FRAME_RATE = 30;
    private static final int I_FRAME_INTERVAL = 5;
    private static final int TIMEOUT_US = 10000;

    private MediaCodec mediaCodec;
    private HandlerThread handlerThread;
    private Handler handler;

    public H264Encoder(int width, int height, int bitRate) {
        try {
            MediaFormat format = MediaFormat.createVideoFormat(MIME_TYPE, width, height);
            format.setInteger(MediaFormat.KEY_BIT_RATE, bitRate);
            format.setInteger(MediaFormat.KEY_FRAME_RATE, FRAME_RATE);
            format.setInteger(MediaFormat.KEY_I_FRAME_INTERVAL, I_FRAME_INTERVAL);
            format.setInteger(MediaFormat.KEY_COLOR_FORMAT, MediaCodecInfo.CodecCapabilities.COLOR_FormatYUV420Flexible);

            mediaCodec = MediaCodec.createEncoderByType(MIME_TYPE);
            mediaCodec.configure(format, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE);
            mediaCodec.start();

            handlerThread = new HandlerThread("EncoderThread");
            handlerThread.start();
            handler = new Handler(handlerThread.getLooper());
        } catch (IOException e) {
            Log.e(TAG, "Error creating H.264 encoder", e);
        }
    }

    public void release() {
        if (mediaCodec != null) {
            mediaCodec.stop();
            mediaCodec.release();
        }

        if (handlerThread != null) {
            handlerThread.quitSafely();
            try {
                handlerThread.join();
            } catch (InterruptedException e) {
                Log.e(TAG, "Error releasing encoder thread", e);
            }
        }
    }

    public void encodeYUVToH264(final byte[] yuvData) {
        if (mediaCodec == null) {
            Log.e(TAG, "Encoder not initialized");
            return;
        }

        handler.post(() -> {
            try {
                int inputBufferIndex = mediaCodec.dequeueInputBuffer(TIMEOUT_US);
                if (inputBufferIndex >= 0) {
                    ByteBuffer inputBuffer = mediaCodec.getInputBuffer(inputBufferIndex);
                    inputBuffer.clear();
                    inputBuffer.put(yuvData);

                    mediaCodec.queueInputBuffer(inputBufferIndex, 0, yuvData.length, System.nanoTime() / 1000, 0);
                }

                MediaCodec.BufferInfo bufferInfo = new MediaCodec.BufferInfo();
                int outputBufferIndex = mediaCodec.dequeueOutputBuffer(bufferInfo, TIMEOUT_US);
                while (outputBufferIndex >= 0) {
                    ByteBuffer outputBuffer = mediaCodec.getOutputBuffer(outputBufferIndex);

                    byte[] h264Data = new byte[bufferInfo.size];
                    outputBuffer.get(h264Data);

                    // TODO: Gửi dữ liệu H.264 đến server hoặc thực hiện các thao tác khác với dữ liệu đã mã hóa

                    mediaCodec.releaseOutputBuffer(outputBufferIndex, false);
                    outputBufferIndex = mediaCodec.dequeueOutputBuffer(bufferInfo, TIMEOUT_US);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error encoding YUV to H.264", e);
            }
        });
    }
}
