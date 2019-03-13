package com.mapspoc;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RegisterLocation extends ReactContextBaseJavaModule {

    static LocationBridge locationBridge;

    private final Context mContext;

    public RegisterLocation(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext=reactContext;
    }

    @Override
    public String getName() {
        return "RegisterLocation";
    }

    @ReactMethod
    public void show() {
        locationBridge=new LocationBridge(mContext);
        locationBridge.bridge();
    }


}
