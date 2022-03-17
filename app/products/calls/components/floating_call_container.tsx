// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState, useEffect} from 'react';
import {View, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ViewTypes} from '@constants';
import EventEmitter from '@mm-redux/utils/event_emitter';
import {makeStyleSheetFromTheme} from '@utils/theme';

const {
    IOS_TOP_PORTRAIT,
    STATUS_BAR_HEIGHT,
    ANDROID_TOP_PORTRAIT,
} = ViewTypes;

const getStyleSheet = makeStyleSheetFromTheme(() => {
    const insets = useSafeAreaInsets();
    let topBarHeight = ANDROID_TOP_PORTRAIT;
    if (Platform.OS === 'ios') {
        topBarHeight = (IOS_TOP_PORTRAIT - STATUS_BAR_HEIGHT) + insets.top;
    }

    return {
        wrapper: {
            position: 'absolute',
            top: topBarHeight,
            width: '100%',
            ...Platform.select({
                android: {
                    elevation: 9,
                },
                ios: {
                    zIndex: 9,
                },
            }),
        },
        withIndicatorBar: {
            top: topBarHeight + ViewTypes.INDICATOR_BAR_HEIGHT,
        },
    };
});

type Props = {
    children: React.ReactNodeArray;
}

const FloatingCallContainer = (props: Props) => {
    const style = getStyleSheet(props);
    const [indicatorBarVisible, setIndicatorBarVisible] = useState(false);
    useEffect(() => {
        EventEmitter.on(ViewTypes.INDICATOR_BAR_VISIBLE, setIndicatorBarVisible);
        return () => EventEmitter.off(ViewTypes.INDICATOR_BAR_VISIBLE, setIndicatorBarVisible);
    }, []);
    return (
        <View style={[style.wrapper, indicatorBarVisible ? style.withIndicatorBar : undefined]}>
            {props.children}
        </View>
    );
};

export default FloatingCallContainer;
