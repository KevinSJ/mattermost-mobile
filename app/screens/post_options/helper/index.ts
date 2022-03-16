// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Screens} from '@constants';
import {showOverlay} from '@screens/navigation';
import {SNACK_BAR_TYPE} from '@screens/snack_bar/constants';

export const showToast = (
    barType: keyof typeof SNACK_BAR_TYPE,
    onPress?: () => void,
) => {
    const screen = Screens.SNACK_BAR;
    const passProps = {
        barType,
        onPress,
    };
    showOverlay(screen, passProps);
};