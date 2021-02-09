
import { initI18n } from '@wix/wix-i18n-config';
import { create as createFedopsLogger } from '@wix/fedops-logger';

import Experiments from '@wix/wix-experiments';

import {
  I18nextProvider,
  PureExperimentsProvider,
  SentryProvider,
  FedopsContext,
  
  HttpProvider,
} from 'yoshi-flow-bm-runtime';

export default {
  initI18n,
  asyncMessagesLoader: (locale: string) => import(`/Users/gilib/Documents/cc-2/day3/src/assets/locale/messages_${locale}.json`),
  createFedopsLogger,
  
  Experiments,

  I18nextProvider,
  PureExperimentsProvider,
  SentryProvider,
  FedopsProvider: FedopsContext.Provider,
  
  HttpProvider,
};