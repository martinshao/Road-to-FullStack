
JS_PUBLIC_API(JSType)
JS_TypeOfValue(JSContext *cx, jsval v)
{
    AssertHeapIsIdle(cx);
    CHECK_REQUEST(cx);
    assertSameCompartment(cx, v);
    return TypeOfValue(cx, v);
}

JSType
js::TypeOfValue(JSContext *cx, const Value &vref)
{
    Value v = vref;
    if (v.isNumber())
        return JSTYPE_NUMBER;
    if (v.isString())
        return JSTYPE_STRING;
    if (v.isNull())
        return JSTYPE_OBJECT;
    if (v.isUndefined())
        return JSTYPE_VOID;
    if (v.isObject()) {
        RootedObject obj(cx, &v.toObject());
        return JSObject::typeOf(cx, obj);
    }
    JS_ASSERT(v.isBoolean());
    return JSTYPE_BOOLEAN;
}

  bool isObject() const {
      return JSVAL_IS_OBJECT_IMPL(data);
  }

  static JS_ALWAYS_INLINE JSBool
  JSVAL_IS_OBJECT_IMPL(jsval_layout l)
  {
      return l.s.tag == JSVAL_TAG_OBJECT;
  }

  /* static */ inline JSType
  JSObject::typeOf(JSContext *cx, js::HandleObject obj)
  {
      js::TypeOfOp op = obj->getOps()->typeOf;
      return (op ? op : js::baseops::TypeOf)(cx, obj);
  }

  JSType
  baseops::TypeOf(JSContext *cx, HandleObject obj)
  {
      return obj->isCallable() ? JSTYPE_FUNCTION : JSTYPE_OBJECT;
  }