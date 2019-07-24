---
title: NullチェックのいらないLiveData
desc: android-architecture-componentsのLiveDataでNullableにしない方法
date: 2019/07/23
tags: Android Kotlin
---
### 下記のようなクラスを作成するだけ
```kotlin
class MutableSafeLiveData<T : Any>(private val default: T) : MutableLiveData<T>(default) {

	override fun getValue() = super.getValue() ?: default

	fun observe(owner: LifecycleOwner, observer: (T) -> Unit) =
		Observer<T>(observer::invoke).also { observe(owner, it) }

	fun observeForever(observer: (T) -> Unit) =
		Observer<T>(observer::invoke).also(::observeForever)

	fun observeWhen(owner: LifecycleOwner, value: T, observer: (T) -> Unit) =
		Observer<T> { if (it == value) observer(it) }.also { observe(owner, it) }
}
```

### 使い方
```kotlin
fun Fragment.main() {
	val data: MutableSafeLiveData<String> = MutableSafeLiveData("abc")
	val getData: String = data.value
	data.value = null // ← error
	data.observe(this) { it: String ->
		Log.d("main", "data=$it")
	}
	data.observeWhen(this, "abc") { it: String ->
		// dataが abc のときだけ
		Log.d("main", "data=$it")
	}
}
```
