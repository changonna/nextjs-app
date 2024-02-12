## 💁‍♂️ Next.js란?
Next.js는 React 기반의 웹 애플리케이션을 쉽게 개발할 수 있도록 도와주는 오픈 소스 JavaScript 프레임워크입니다. Next.js는 React를 기반으로 하며, `서버 사이드 렌더링 (SSR)`, `정적 사이트 생성 (SSG)`, `API 라우팅` 등의 기능을 제공하여 개발자가 더 효과적으로 웹 애플리케이션을 구축할 수 있도록 지원합니다.

### 서버 사이드 렌더링 (SSR)
Next.js는 페이지를 서버에서 사전에 렌더링하여 초기 로딩 성능을 향상시킵니다. 이는 검색 엔진 최적화(SEO)에도 도움이 되며, 사용자에게 빠른 초기 로딩 속도를 제공합니다.

### 정적 사이트 생성 (SSG)
특정 페이지나 컨텐츠를 미리 렌더링하여 정적 파일로 생성할 수 있습니다. 이는 더 빠른 로딩 속도를 제공하며, 서버에 부담을 줄일 수 있습니다.

### 빠른 개발 속도
Next.js는 기본적으로 코드 스플리팅, 자동 번들링, 라우팅 설정 등을 제공하여 개발자가 빠르게 개발할 수 있도록 도와줍니다.

### Hot Module Replacement (HMR)
애플리케이션이 실행 중일 때 모듈을 교체하여 수정된 내용을 즉시 반영할 수 있습니다. 이는 개발자가 애플리케이션을 수정하고 테스트할 때 빠른 피드백을 제공합니다.

### API 라우팅
API 엔드포인트를 쉽게 만들고 사용할 수 있도록 도와주는 기능을 제공합니다. 이는 클라이언트와 서버 간의 데이터 통신을 간편하게 처리할 수 있도록 도와줍니다.

---

## Next.js 애플리케이션을 생성하는데 사용되는 명령어입니다.
```sh
npx create-next-app ./
```

## 폴더구조
![](https://velog.velcdn.com/images/changonna/post/6d9513f3-6bed-4b34-a588-7ae779b62d44/image.png)

### pages
- `index.tsx` : 처음 "/" 페이지
- `_app.tsx` : 모든페이지에 공통으로 들어가는 레이아웃 작성 (url을 통해 특정 페이지에 진입하기 전 통과하는 **인터셉터 페이지**)

### public
- 이미지 같은 정적(static) 보관

### styles
- module css는 컴포넌트에 종속적으로 스타일링하기 위한 것이며, 확장자 앞에 module을 붙여줘야 합니다.
ex) page: test.tsx - style: Test.module.css

### next.config.js
- Next.js는 `Webpack`을 기본 번들러로 사용하기 때문에 웹팩에 관한 설정을 하는 파일

---

## Pre-rendering

애플리케이션의 **페이지를 미리 생성**하여 정적인 HTML 파일로 제공하는 기술을 말합니다. 
모든 페이지를 위한 HTML을 Client Side에서 Javascript로 처기하기 전 `사전에` 생성한다는 것입니다.
이는 웹 페이지의 성능을 향상시키고 SEO 검색엔진 최적화를 개선하는 데 도움이 됩니다.

---


## Data Fetching

### Next.js에서 데이터를 가져오는 방법

#### getStaticProps

정적 생성(Static Generation)을 사용할 때 데이터를 가져오는 메서드입니다. 이 메서드는 빌드 시에 데이터를 불러와 페이지를 미리 렌더링합니다. 주로 정적인 컨텐츠를 생성할 때 사용됩니다.

```js
// 예시: pages/index.js
export async function getStaticProps() {
  // 데이터를 가져오는 비동기 함수
  const data = //... 데이터를 가져오는 로직

  return {
    props: {
      data,
    },
  };
}
```

#### getStaticPaths
getStaticPaths는 동적 라우팅 구현 시에 사용됩니다. 특히, pages/[id].js와 같이 동적인 라우팅이 필요한 경우에 사용됩니다. 이 메서드를 사용하여 가능한 모든 경로를 미리 정의할 수 있습니다.
    
```js
// 예시: pages/post/[id].js
export async function getStaticPaths() {
  // 가능한 모든 id를 가져오는 비동기 함수
  const paths = //... 가능한 모든 id 배열

  return {
    paths,
    fallback: false, // true로 설정하면 존재하지 않는 데이터에 대한 요청이 올 경우 404 대신 빈 페이지가 보여짐
  };
}

export async function getStaticProps({ params }) {
  // params.id를 이용하여 특정 id에 해당하는 데이터를 가져오는 비동기 함수
  const data = //... 특정 id에 해당하는 데이터를 가져오는 로직

  return {
    props: {
      data,
    },
  };
}
```

    
#### getServerSideProps
getServerSideProps는 서버 측 렌더링(Server Side Rendering, SSR)을 사용할 때 데이터를 가져오는 메서드입니다. 매 요청마다 서버에서 데이터를 불러와 페이지를 렌더링합니다.
    
```js
// 예시: pages/api/[id].js
export async function getServerSideProps({ params }) {
  // params.id를 이용하여 특정 id에 해당하는 데이터를 가져오는 비동기 함수
  const data = //... 특정 id에 해당하는 데이터를 가져오는 로직

  return {
    props: {
      data,
    },
  };
}
```

---


    
