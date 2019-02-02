
 -- This is Maybe
> :i Maybe
data Maybe a = Nothing | Just a         -- Defined in ‘GHC.Base’

  -- Functor typeclass
class Functor f where
  fmap :: (a -> b) -> f a -> f b

  -- Maybe Functor
class Functor Maybe where
  fmap :: (a -> b) -> Maybe a -> Maybe b

  -- Maybe instance Factor
instance Functor Maybe where
  fmap func (Just x) = Just (func x)
  fmap func Nothing  = Nothing

  -- Applicative typeclass
class Functor f => Applicative f where
  pure :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b

  -- Maybe Applicative
class Functor Maybe => Applicative Maybe where
  pure :: a -> Maybe a
  (<*>) :: Maybe (a -> b) -> Maybe a -> Maybe b

  -- Maybe instance Applicative
instance Applicative Maybe where
  pure = Just
  Nothing <*> _ = Nothing
  (Just func) <*> something = fmap func something

  -- Monad typeclass
class Applicative m => Monad m where
  return :: a -> m a
  (>>=) :: m a -> (a -> m b) -> m b
  (>>) :: m a -> m b -> m b
  x >> y = x >>= \_ -> y
  fail :: String -> m a
  fail msg = error msg

  -- Monad typeclass
class Applicative m => Monad m where
  return :: a -> m a
  (>>=) :: m a -> (a -> m b) -> m b

  -- Maybe Monad
class Applicative Maybe => Monad Maybe where
  return :: a -> Maybe a
  (>>=) :: Maybe a -> (a -> Maybe b) -> Maybe b

  -- Maybe instance Monad
instance Monad Maybe where
  return x = Just x
  Nothing >>= func = Nothing
  Just x >>= func  = func x

half x = if even x
  then Just (x `div` 2)
  else Nothing