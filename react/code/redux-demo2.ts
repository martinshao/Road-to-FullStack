@connect(
    ({
      listTableList,
      loading,
    }: {
      listTableList: StateType;
      loading: {
        models: {
          [key: string]: boolean;
        };
      };
    }) => ({
      listTableList,
      loading: loading.models.rule,
    }),
  )