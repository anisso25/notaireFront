import { createGlobalStyle } from 'styled-components';

// Regular
import NotoNaskhArabicRegularEot from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-regular.eot';
/*
import NotoNaskhArabicRegularEotIeFix
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-regular.eot?#iefix';
*/
import NotoNaskhArabicRegularWoff2 from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-regular.woff2';
import NotoNaskhArabicRegularWoff from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-regular.woff';
import NotoNaskhArabicRegularTtf from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-regular.ttf';
/*
import NotoNaskhArabicRegularSvg
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-regular.svg#NotoNaskhArabic';
*/

// 500
import NotoNaskhArabic500Eot from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-500.eot';
/*
import NotoNaskhArabic500EotIeFix
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-500.eot?#iefix';
*/
import NotoNaskhArabic500Woff2 from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-500.woff2';
import NotoNaskhArabic500Woff from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-500.woff';
import NotoNaskhArabic500Ttf from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-500.ttf';
/*
import NotoNaskhArabic500Svg
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-500.svg#NotoNaskhArabic';
*/

// 600
import NotoNaskhArabic600Eot from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-600.eot';
/*
import NotoNaskhArabic600EotIeFix
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-600.eot?#iefix';
*/
import NotoNaskhArabic600Woff2 from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-600.woff2';
import NotoNaskhArabic600Woff from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-600.woff';
import NotoNaskhArabic600Ttf from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-600.ttf';
/*
import NotoNaskhArabic600Svg
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-600.svg#NotoNaskhArabic';
*/

// 700
import NotoNaskhArabic700Eot from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-700.eot';
/*
import NotoNaskhArabic700EotIeFix
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-700.eot?#iefix';
*/
import NotoNaskhArabic700Woff2 from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-700.woff2';
import NotoNaskhArabic700Woff from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-700.woff';
import NotoNaskhArabic700Ttf from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-700.ttf';
/*
import NotoNaskhArabic700Svg
  from '~/containers/Common/Fonts/fonts/noto-naskh-arabic-v10-arabic-700.svg#NotoNaskhArabic';
*/

export default createGlobalStyle`
  /* noto-naskh-arabic-regular - arabic */
  @font-face {
    font-family: 'NotoNaskhArabic';
    font-style: normal;
    font-weight: 400;
    src: url(${NotoNaskhArabicRegularEot}); /* IE9 Compat Modes */
    src: local(''),
        url(${NotoNaskhArabicRegularWoff2}) format('woff2'), /* Super Modern Browsers */
        url(${NotoNaskhArabicRegularWoff}) format('woff'), /* Modern Browsers */
        url(${NotoNaskhArabicRegularTtf}) format('truetype') /* Safari, Android, iOS */
  }

  /* noto-naskh-arabic-500 - arabic */
  @font-face {
    font-family: 'NotoNaskhArabic';
    font-style: normal;
    font-weight: 500;
    src: url(${NotoNaskhArabic500Eot}); /* IE9 Compat Modes */
    src: local(''),
        url(${NotoNaskhArabic500Woff2}) format('woff2'), /* Super Modern Browsers */
        url(${NotoNaskhArabic500Woff}) format('woff'), /* Modern Browsers */
        url(${NotoNaskhArabic500Ttf}) format('truetype') /* Safari, Android, iOS */
  }

  /* noto-naskh-arabic-600 - arabic */
  @font-face {
    font-family: 'NotoNaskhArabic';
    font-style: normal;
    font-weight: 600;
    src: url(${NotoNaskhArabic600Eot}); /* IE9 Compat Modes */
    src: local(''),
        url(${NotoNaskhArabic600Woff2}) format('woff2'), /* Super Modern Browsers */
        url(${NotoNaskhArabic600Woff}) format('woff'), /* Modern Browsers */
        url(${NotoNaskhArabic600Ttf}) format('truetype') /* Safari, Android, iOS */
  }

  /* noto-naskh-arabic-700 - arabic */
  @font-face {
    font-family: 'NotoNaskhArabic';
    font-style: normal;
    font-weight: 700;
    src: url(${NotoNaskhArabic700Eot}); /* IE9 Compat Modes */
    src: local(''),
        url(${NotoNaskhArabic700Woff2}) format('woff2'), /* Super Modern Browsers */
        url(${NotoNaskhArabic700Woff}) format('woff'), /* Modern Browsers */
        url(${NotoNaskhArabic700Ttf}) format('truetype') /* Safari, Android, iOS */
  }

`;
