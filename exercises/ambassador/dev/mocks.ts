import { AmbassadorTestkit } from 'yoshi-serverless-testing';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
// There’s no need to import and instantiate `@wix/ambassador-testkit`, instead, it’s
// injected into the function
export default function ({
  ambassadorTestkit,
}: {
  ambassadorTestkit: AmbassadorTestkit;
}) {
  const metaSiteManagerStub = ambassadorTestkit.createStub(NodeWorkshopScalaApp);
  metaSiteManagerStub
    .CommentsService()
    .fetch.when('a1ea1e40-8698-42e7-a75a-85cd95ffaa11')
    .resolve([{ text: 'mock Be happy', author: 'mock ogi' }]);
}
