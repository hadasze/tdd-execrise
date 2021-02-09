import { bootstrap } from 'yoshi-serverless-testing';
import HttpClient from 'yoshi-serverless-client';
import { fetchComments } from '../src/comments.api';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

const serverlessApp = bootstrap();
serverlessApp.beforeAndAfter();
let client: HttpClient;

beforeAll(async () => {
  client = new HttpClient({ baseUrl: serverlessApp.getUrl() });
});

test('should say hello', async () => {
  const aComment = { text: 'mock Be happy', author: 'mock ogi' };
  const commentsStub = serverlessApp.ambassador.createStub(NodeWorkshopScalaApp)
  commentsStub
    .CommentsService()
    .fetch.when('a1ea1e40-8698-42e7-a75a-85cd95ffaa11')
    .resolve([aComment]);

  const response = await client.request(fetchComments)();

  expect(response).toEqual([aComment]);
});
