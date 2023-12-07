package com.appstream;

import android.hardware.HardwareBuffer;
import android.media.Image;

import androidx.annotation.NonNull;

import com.mrousavy.camera.core.HardwareBuffersNotAvailableError;
import com.mrousavy.camera.frameprocessor.Frame;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;


import java.nio.ByteBuffer;
import java.util.Map;

import javax.annotation.Nullable;

public class LiveStreamFrameProcessorPlugin extends FrameProcessorPlugin {
    public LiveStreamFrameProcessorPlugin(@androidx.annotation.Nullable Map<String, Object> options) {
        super(options);
    }

    @Nullable
    @Override
    public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments){
        if (arguments == null) {
            return null;
        }

        String serverURL = (String)arguments.get("serverURL");
        Frame frameCopy = new Frame(frame);

        H264Encoder h264Encoder = new H264Encoder(frame.getWidth(), frame.getHeight(),1000000);
        h264Encoder.encodeYUVToH264(convertImageToByteArray(frame.getImage()));
        //frameCopy.close();
        return null;
    }
    public byte[] convertImageToByteArray(Image image){
        if (image == null) {
            return null;
        }

        Image.Plane[] planes = image.getPlanes();
        ByteBuffer yBuffer = planes[0].getBuffer();
        ByteBuffer uBuffer = planes[1].getBuffer();
        ByteBuffer vBuffer = planes[2].getBuffer();

        int ySize = yBuffer.remaining();
        int uSize = uBuffer.remaining();
        int vSize = vBuffer.remaining();

        byte[] data = new byte[ySize + uSize + vSize];

        yBuffer.get(data, 0, ySize);

        uBuffer.get(data, ySize, uSize);
        vBuffer.get(data, ySize + uSize, vSize);

        return data;
    }
}
