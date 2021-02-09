import React from 'react';
import { act, render, waitForElement } from '@testing-library/react';
import { TextTestkit } from 'wix-style-react/dist/testkit';
import { testkit } from 'yoshi-flow-bm/testkit';
import Index from './index';
import { fetchComments } from '../comments.api';

describe('index', () => {
  testkit.beforeAndAfter();

  beforeEach(() => testkit.reset());

  it('renders a comment correctly', async () => {
    const { TestComponent } = testkit.getBMComponent(Index, {
      mocks: [
        {
          request: { method: fetchComments, args: [] },
          result: () => {
            return [
              {
                text: 'first comment',
                author: 'Mocky',
              },
            ];
          },
        },
      ],
    });

    const { baseElement } = render(<TestComponent />);
    await act(async () => {
      await waitForElement(() => 'comments-section');
    });

    const pageHeaderTestKit = TextTestkit({
      wrapper: baseElement,
      dataHook: 'comments-section',
    });

    expect(await pageHeaderTestKit.getText()).toMatch(
      '<div><b>Text:</b> first comment, <b>Author:</b> Mocky</div>',
    );
  });
});
