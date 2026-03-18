import timerCode from '../../components/common/Timer.tsx?raw';
import formBuilderCode from '../../components/common/FormBuilder.tsx?raw';
import searchAutoCompleteCode from '../../components/autocomplete/SearchAutoComplete.tsx?raw';
import useAutoCompleteCode from '../../components/autocomplete/useAutoComplete.ts?raw';
import autoCompleteTypesCode from '../../components/autocomplete/types.ts?raw';
import customFormCode from '../../components/CustomForm/CustomForm.tsx?raw';
import formWithValidationCode from '../../components/CustomForm/FormWithValidation.tsx?raw';
import chatAppCode from '../../components/chat/ChatApp.tsx?raw';
import chatListCode from '../../components/chat/ChatList.tsx?raw';
import chatBubbleCode from '../../components/chat/ChatBubble.tsx?raw';
import chatInputCode from '../../components/chat/ChatInput.tsx?raw';
import useChatCode from '../../components/chat/useChat.ts?raw';
import chatTypesCode from '../../components/chat/types.ts?raw';
import infiniteScrollListCode from '../../components/infinite-scroll/InfiniteScrollList.tsx?raw';
import infiniteScrollItemCode from '../../components/infinite-scroll/InfiniteScrollItem.tsx?raw';
import useInfiniteScrollCode from '../../components/infinite-scroll/useInfiniteScroll.ts?raw';
import infiniteScrollTypesCode from '../../components/infinite-scroll/types.ts?raw';
import starRatingCode from '../../components/star-rating/StarRating.tsx?raw';
import useStarRatingCode from '../../components/star-rating/useStarRating.ts?raw';
import starRatingTypesCode from '../../components/star-rating/types.ts?raw';

const withHeader = (path: string, code: string) => `// File: ${path}\n${code}`;

export const codeSamples: Record<string, string> = {
  'timer': withHeader('src/components/common/Timer.tsx', timerCode),
  'form-builder': withHeader('src/components/common/FormBuilder.tsx', formBuilderCode),
  'autocomplete': [
    withHeader('src/components/autocomplete/SearchAutoComplete.tsx', searchAutoCompleteCode),
    withHeader('src/components/autocomplete/useAutoComplete.ts', useAutoCompleteCode),
    withHeader('src/components/autocomplete/types.ts', autoCompleteTypesCode),
  ].join('\n\n'),
  'custom-form': withHeader('src/components/CustomForm/CustomForm.tsx', customFormCode),
  'validation-form': withHeader('src/components/CustomForm/FormWithValidation.tsx', formWithValidationCode),
  'chat': [
    withHeader('src/components/chat/ChatApp.tsx', chatAppCode),
    withHeader('src/components/chat/ChatList.tsx', chatListCode),
    withHeader('src/components/chat/ChatBubble.tsx', chatBubbleCode),
    withHeader('src/components/chat/ChatInput.tsx', chatInputCode),
    withHeader('src/components/chat/useChat.ts', useChatCode),
    withHeader('src/components/chat/types.ts', chatTypesCode),
  ].join('\n\n'),
  'infinite-scroll': [
    withHeader('src/components/infinite-scroll/InfiniteScrollList.tsx', infiniteScrollListCode),
    withHeader('src/components/infinite-scroll/InfiniteScrollItem.tsx', infiniteScrollItemCode),
    withHeader('src/components/infinite-scroll/useInfiniteScroll.ts', useInfiniteScrollCode),
    withHeader('src/components/infinite-scroll/types.ts', infiniteScrollTypesCode),
  ].join('\n\n'),
  'star-rating': [
    withHeader('src/components/star-rating/StarRating.tsx', starRatingCode),
    withHeader('src/components/star-rating/useStarRating.ts', useStarRatingCode),
    withHeader('src/components/star-rating/types.ts', starRatingTypesCode),
  ].join('\n\n'),
};