
import {
  createModule,
  HttpClient,
} from 'yoshi-flow-bm-runtime';
const createBILogger = undefined;
import type { ModuleLite } from 'yoshi-flow-bm-runtime/common';

createModule({
  module: {
    module: {"moduleId":"DAY3-dev","config":{"moduleId":"DAY3-dev","appDefId":"7c97fe07-619e-4c55-9a8a-2a3c300fb0a2","isCoreService":true,"routeNamespace":"day3-dev","translations":{"enabled":true,"suspense":true},"experiments":{"scopes":["day3"]},"topology":{"staticsUrl":{"artifactId":"com.wixpress.day3"}},"moduleBundleName":"module.dev"},"fedopsPath":"/Users/gilib/Documents/cc-2/day3/fedops.json"} as ModuleLite,
    
    
  },
  pages: [
    
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