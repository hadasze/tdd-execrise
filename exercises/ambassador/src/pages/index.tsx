import React, { FC } from 'react';
import { useRequest, useTranslation, useAppLoaded, Trans } from 'yoshi-flow-bm-runtime';
import { Page, Container, Card, Text } from 'wix-style-react';
import { method } from 'yoshi-serverless';
import {fetchComments} from '../comments.api';

const introUrl = 'https://github.com/wix-private/business-manager';

const Index: FC = () => {
  useAppLoaded({ auto: true });
  const { t } = useTranslation();

  const { loading, error, data } = useRequest(fetchComments);

  if(loading) {
    return <div> Loading... </div>
  }
  if(error) {
    return <div> error :( </div>
  }

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Container>
          <Card>
            <Card.Content>
              <Text dataHook="comments-section">{data?.map(comment => <div><b>Text:</b> {comment.text}, <b>Author:</b> {comment.author}</div>)}</Text>
            </Card.Content>
          </Card>
        </Container>
      </Page.Content>
    </Page>
  );
};

export default Index;
