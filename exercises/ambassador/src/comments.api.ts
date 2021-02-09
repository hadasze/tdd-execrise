import { method } from 'yoshi-serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

export const fetchComments = method(async function() {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  return commentsService(this.context.aspects).fetch(
     'a1ea1e40-8698-42e7-a75a-85cd95ffaa11',
   );
});
