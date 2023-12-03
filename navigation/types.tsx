import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
    MainTab: NavigatorScreenParams<MainTabParamList>;
    Login: undefined;
    Register: undefined;
    Live: undefined;
  };

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
    NativeStackScreenProps<RootStackParamList, T>;

export type MainTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    Camera: undefined;
    Profile: undefined;
    Chat: undefined;
    Live: undefined;
    
}

export type MainTabScreemProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >

export type HomeStackParamList = {
  Home: undefined;
  WatchVideo: {
      sourceUri?: string | undefined;
      authorName?: string | undefined;
      title?: string | undefined;
      info?: string | undefined;
      views?: number | undefined;
      likes?: number | undefined;
    };
  WatchLive: undefined;
}

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = 
    NativeStackScreenProps<HomeStackParamList, T>;


declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

export type VideoItemProps = {
    id?: string,
    title?: string,
    preview?: string,
    authorName?: string,
    views?: number,
    sourceUri?: string,
    info?: string,
    likes?: number,
    handleOpenVideo?: () => void
}

export type VideoTopListProps = {
  data: VideoItemProps [], 
  handleOpenVideo?: () => void
}