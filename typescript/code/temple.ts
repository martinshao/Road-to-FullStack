interface KlineBlocBase {
    name: string
}

class KlineBlocProvider<T extends KlineBlocBase> extends StatefulWidget {
    KlineBlocProvider({ Key key, @required this.child, @required this.bloc})
        : super(key: key);
final Widget child;
final T bloc;
@override
_KlineBlocProviderState < T > createState() => _KlineBlocProviderState<T>();
    static T of<T extends KlineBlocBase>(BuildContext context) {
    final type = _typeOf<KlineBlocProvider<T>>();
    KlineBlocProvider < T > provider = context.ancestorWidgetOfExactType(type);
    return provider.bloc;
}
    static Type _typeOf<T>() => T;
  }