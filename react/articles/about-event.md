## React 合成事件

``` js
// react-18.0.2
dispatchDiscreteEvent
dispatchEvent
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
dispatchEventForPluginEventSystem
batchedUpdates
batchedUpdates$1
dispatchEventsForPlugins
extractEvents$5              -> processDispatchQueue
extractEvents$4              -> processDispatchQueueItemsInOrder
SyntheticBaseEvent           -> executeDispatch
timeStamp                    -> invokeGuardedCallbackAndCatchFirstError
                                invokeGuardedCallback
                                invokeGuardedCallbackDev
                                addEventListener
                                Event: react-click


flushSyncCallbacks
performSyncWorkOnRoot
renderRootSync
workLoopSync                                                                                                       -> 
performUnitOfWork
beginWork$1                                                                               -> startProfilerTimer    -> completeUnitOfWork
beginWork                                                                                 -> exports.unstable_now
attemptEarlyBailoutIfNoScheduledUpdate  -> updateFunctionComponent
bailoutOnAlreadyFinishedWork            -> renderWithHooks
cloneChildFibers                        -> UseStateDemo
                                                                    -> jsxWithValidation
                                                                    -> jsxDEV
                                                                    -> ReactElement




                   -> commitRoot
markRenderStopped  -> commitRootImpl
markRenderStopped  -> markCommitStarted  -> scheduleCallback$1                -> commitMutationEffects              -> resetAfterCommit     -> markLayoutEffectsStarted
markAndClear       -> markCommitStarted  -> unstable_scheduleCallback         -> commitMutationEffectsOnFiber       -> restoreSelection     -> markLayoutEffectsStarted
mark               -> markMetadata       -> requestHostCallback               -> recursivelyTraverseMutationEffects -> getActiveElementDeep -> markAndClear
                   -> markAndClear       -> schedulePerformWorkUntilDeadline  -> commitMutationEffectsOnFiber
                   -> mark               -> postMessage                       -> recursivelyTraverseMutationEffects
                                                                              -> commitMutationEffectsOnFiber
                                                                              -> recursivelyTraverseMutationEffects
                                                                              -> commitMutationEffectsOnFiber
                                                                              -> recursivelyTraverseMutationEffects
                                                                              -> commitMutationEffectsOnFiber
                                                                              -> recursivelyTraverseMutationEffects
                                                                              -> commitMutationEffectsOnFiber
                                                                              -> recursivelyTraverseMutationEffects
                                                                              -> commitMutationEffectsOnFiber
                                                                              -> commitTextUpdate

onCommitRoot            -> flushPassiveEffects
hook.onCommitFiberRoot  -> flushPassiveEffectsImpl
onCommitFiberRoot       -> markPassiveEffectsStarted  -> commitPassiveUnmountEffects           -> commitPassiveMountEffects
handleCommitFiberRoot   -> markPassiveEffectsStarted  -> commitPassiveUnmountEffects_begin     -> commitPassiveMountEffects_begin
updateFiberRecursively  -> markAndClear               -> commitPassiveUnmountEffects_complete  -> commitPassiveMountEffects_complete
updateFiberRecursively  -> mark                       -> commitPassiveUnmountOnFiber           -> commitPassiveMountOnFiber
getOrGenerateFiberID                                  -> commitHookEffectListUnmount                      -> commitHookEffectListMount
                                                      -> markComponentPassiveEffectUnmountStarted         -> create
                                                      -> markComponentPassiveEffectUnmountStarted         -> setTimeout
                                                      -> markAndClear
                                                      -> mark
```