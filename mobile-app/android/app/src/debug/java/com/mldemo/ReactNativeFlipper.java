/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * <p>This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */
package com.mldemo;

import android.content.Context;
import com.facebook.react.ReactInstanceManager;

/**
 * Class responsible for initializing Flipper which is the debug tool for React Native apps.
 * Flipper has been disabled to avoid dependency conflicts.
 */
public class ReactNativeFlipper {
  public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
    // Flipper is disabled
    // This is intentional to avoid Fresco dependency conflicts
  }
}
