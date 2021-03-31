---
title: Android build.gradle.ktsのすゝめ
description: Android build.gradle.ktsのすゝめ
date: 2019/07/10
tags: Android Kotlin
---

# Android: build.gradle.kts のすゝめ

[Github](https://github.com/SorrowBlue/AndroidGradleKts)
[![Build Status](https://travis-ci.com/SorrowBlue/sorrowblue.github.io.svg?token=69SwqJzT2mqgmiiajAiQ&branch=gh-pages)](https://travis-ci.com/SorrowBlue/sorrowblue.github.io)

## 環境

|         tool          |   version    |
| :-------------------: | :----------: |
|        Gradle         |    5.4.1     |
|        Kotlin         |    1.3.41    |
|    Android Studio     |  3.5 Beta 5  |
| Android Gradle Plugin | 3.5.0-beta05 |

## 既存のプロジェクトへの導入

1. 設定の変更
   `ファイル - 設定 - 言語＆フレームワーク - Kotlin - Kotlinスクリプト`
   ファイル変更時にスクリプト依存関係を再ロードする にチェックする  
   ![build_src](/images/android-gradle-kts/settings_kotlin-script_reload.webp)

2. プロジェクトルートに `buildSrc` を作成  
   ![build_src](/images/android-gradle-kts/build_src.webp)

3. `buildSrc` に `build.gradle.kts` と `settings.gradle.kts` を作成  
   ![build-settings-gradle-kts](/images/android-gradle-kts/build-settings-gradle-kts.webp)

4. `build.gradle.kts` に記述

   ```kotlin
   plugins {
     `kotlin-dsl`
   }
   repositories {
         jcenter()
         google()
     }
     dependencies {
         implementation("com.android.tools.build:gradle:3.5.0-beta05")
         implementation("org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.41")
     }
   ```

5. Sync now(今すぐ同期)  
   ![sync_now](/images/android-gradle-kts/sync_now.webp)

6. プロジェクトルートの `settings.gradle` を `settings.gradle.kts` にリネーム  
   ![settings-gradle-kts](/images/android-gradle-kts/settings-gradle-kts.webp)

7. `settings.gradle.kts` を編集

```kotlin
include(":app")
rootProject.name = "My Application"
```

8. プロジェクトルートの `build.gradle` を `build.gradle.kts` にリネーム

9. `build.gradle.kts` を編集

```kotlin
buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:3.5.0-beta05")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.41")
    }
}
allprojects {
    repositories {
        google()
        jcenter()

    }
}
task<Delete>("clean") { delete(rootProject.buildDir) }
```

10. `app/build.gradle` を `app/build.gradle.kts` にリネーム

11. `app/build.gradle.kts` を編集

```kotlin
plugins {
    id("com.android.application")
    id("kotlin-android")
    id("kotlin-android-extensions")
}
android {
    compileSdkVersion(29)
    buildToolsVersion = "29.0.0"
    defaultConfig {
        applicationId = "com.sorrowblue.myapplication"
        minSdkVersion(23)
        targetSdkVersion(29)
        versionCode =1
        versionName ="1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}
dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.3.41")
    implementation("androidx.appcompat:appcompat:1.0.2")
    implementation("androidx.core:core-ktx:1.0.2")
    implementation("androidx.constraintlayout:constraintlayout:1.1.3")
    testImplementation("junit:junit:4.12")
    androidTestImplementation("androidx.test.ext:junit:1.1.0")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.1.1")
}
```

12. Sync now(今すぐ同期)

## スマートに書く

`getByName("release")` このあたりを拡張関数で記述する

`buildSrc/src/main/kotlin/Project.kt` を作成

`Project.kt`

```kotlin
import com.android.build.gradle.internal.dsl.BuildType
import org.gradle.api.NamedDomainObjectContainer
fun NamedDomainObjectContainer<BuildType>.release(body: BuildType.() -> Unit) {
    getByName("release") { body(this) }
}
```

`app/build.gradle.kts`

```kotlin
release {
	isMinifyEnabled = false
	proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
}
```

## 変数を定義

もちろん変数も定義して使える

`buildSrc/src/main/kotlin/Versions.kt`

```kotlin
object Versions {
	const val kotlin = "1.3.41"
	const val appcompat = "1.0.2"
	const val `core-ktx` = "1.0.2"
	const val constraintlayout = "1.1.3"
	const val junit = "4.12"
    const val androidx_junit = "1.1.0"
    const val `espresso-core` = "3.1.1"
}
```

`buildSrc/src/main/kotlin/Deps.kt`

```kotlin
object Deps {
	const val `kotlin-stdlib-jdk7` = "org.jetbrains.kotlin:kotlin-stdlib-jdk7:${Versions.kotlin}"
	const val appcompat = "androidx.appcompat:appcompat:${Versions.appcompat}"
    const val `core-ktx` = ("androidx.core:core-ktx:${Versions.`core-ktx`}")
    const val constraintlayout = "androidx.constraintlayout:constraintlayout:${Versions.constraintlayout}"
    const val junit = "junit:junit:${Versions.junit}"
    const val androidx_junit = "androidx.test.ext:junit:${Versions.androidx_junit}"
    const val `espresso-core` = "androidx.test.espresso:espresso-core:${Versions.`espresso-core`}"
}
```

`app/build.gradle.kts`

```kotlin
dependencies {
    implementation(Deps.`kotlin-stdlib-jdk7`)
    implementation(Deps.appcompat)
    implementation(Deps.`core-ktx`)
    implementation(Deps.constraintlayout)
    testImplementation(Deps.junit)
    androidTestImplementation(Deps.androidx_junit)
    androidTestImplementation(Deps.`espresso-core`)
}
```

## Tips

### 各モジュールの `minSdkVersion` `targetSdkVersion` などをまとめる

`Project.kt`

```kotlin
fun Project.module(action: LibraryExtension.() -> Unit) {
	afterEvaluate {
		if (hasProperty("android") && project.name != "app") {
			action(extensions.getByName("android") as LibraryExtension)
		}
	}
}
```

`/build.gradle.kts`

```kotlin
subprojects {
	module {
		compileSdkVersion(COMPILE_SDK_VERSION)
		defaultConfig {
			minSdkVersion(MIN_SDK_VERSION)
			targetSdkVersion(TARGET_SDK_VERSION)
			consumerProguardFiles(`consumer-rules`)
			testInstrumentationRunner = ANDROID_JUNIT_RUNNER
		}
	}
}
```

### 任意の箇所で apply したいとき

`/app/build.gradle.kts`

```kotlin
plugins {
	id("com.google.gms.google-services") apply false
}
/*..........processing..........*/
apply(plugin = "com.google.gms.google-services")
```

### プラグインを共通化したい

`/build.gradle.kts`

```kotlin
subprojects {
	if (project.name == "app") {
		apply(plugin = "com.android.application")
	} else {
		apply(plugin = "com.android.library")
	}
	apply(plugin = "kotlin-android")
	apply(plugin = "kotlin-android-extensions")
}
```
