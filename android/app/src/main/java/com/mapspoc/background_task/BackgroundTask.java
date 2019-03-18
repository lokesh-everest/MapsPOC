package com.mapspoc.background_task;

import android.content.Context;
import android.content.Intent;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Timer;
import java.util.TimerTask;

public class BackgroundTask extends ReactContextBaseJavaModule {

    private static Timer timer;

    private final Context mContext;

    public BackgroundTask(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "BackgroundTask";
    }

    @ReactMethod
    public void activate() {
        timer = new Timer();
        timer.scheduleAtFixedRate(
                new TimerTask() {
                    @Override
                    public void run() {
                        runTask();
                    }
                }, 0, 1000
        );

    }

    private void runTask() {
        Intent myIntent = new Intent(mContext, BackgroundTaskService.class);
        mContext.startService(myIntent);
        HeadlessJsTaskService.acquireWakeLockNow(mContext);
    }


    @ReactMethod
    public void deActivate() {
        if (timer != null) {
            timer.cancel();
            timer.purge();
        }
    }
}
