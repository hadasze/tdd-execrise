
import {
  createModule,
  HttpClient,
} from 'yoshi-flow-bm-runtime';
const createBILogger = undefined;
import type { ModuleLite } from 'yoshi-flow-bm-runtime/common';

createModule({
  module: {
    module: {"moduleId":"DAY3","config":{"moduleId":"DAY3","appDefId":"7e406d7d-20dc-4de6-a4f4-fd62f7de2ae5","isCoreService":true,"routeNamespace":"day3","translations":{"enabled":true,"suspense":true},"sentry":{"DSN":"https://9d035614b6bc48e3868fecb154485e98@sentry.wixpress.com/1214","id":"9d035614b6bc48e3868fecb154485e98","projectName":"day3","teamName":"cc-2-21"},"experiments":{"scopes":["day3"]},"enabledByExperiments":["specs.infra.yoshi-bm.ChangeMe"],"topology":{"staticsUrl":{"artifactId":"com.wixpress.day3"}},"moduleBundleName":"module"},"fedopsPath":"/Users/gilib/Documents/cc-2/day3/fedops.json"} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"DAY3.pages.index","componentType":"page","componentName":"DAY3.pages.index"},
    loadReactComponent: async () => (await import(/* webpackChunkName: "DAY3.pages.index" */ './pages/index')).default,
    
    
    
  },
  ],
  exportedComponents: [
    
  ],
  useEssentials: false,
  methods: [
    
  ],
  optionalDeps: {
    HttpClient,
    loadOptionalFlowAPIDeps: async () => (await import(/* webpackChunkName: "flowAPIDeps" */ '../flowAPIDeps')).default,
    asyncMessagesLoader: (locale: string) => import(`/Users/gilib/Documents/cc-2/day3/src/assets/locale/messages_${locale}.json`),
    createBILogger,
  },
});