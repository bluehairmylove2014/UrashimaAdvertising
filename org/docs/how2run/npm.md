# Hướng dẫn sử dụng Monorepo với NX cho ứng dụng Next.js

## Cài đặt NX

Đầu tiên, bạn cần cài đặt NX. Bạn có thể làm điều này bằng cách chạy lệnh sau trong terminal:
`npx create-nx-workspace@latest`

## Cài @nrwl package

Chạy `nx report` để hiển thị danh sách các gói hiện có trong project, nếu chưa có gói cần tìm,
chạy `npm i @nrwl/<package>` với `<package>` là gói bạn cần dùng. Ở đây, tôi dùng gói next
`npm i @nrwl/next`

## Tạo ứng dụng Next.js

Sau khi đã cài đặt NX, Di chuyển tới thư mục project mới khởi tạo, bạn có thể tạo một ứng dụng Next.js
mới bằng cách chạy lệnh sau:
`npx nx g @nrwl/next:app myapp --directory=apps/myapp`
Thay `myapp` bằng tên của ứng dụng của bạn.
Thay `apps/myapp` bằng đường dẫn tới app của bạn

## Tạo thư viện chia sẻ

Bạn cũng có thể tạo một thư viện chia sẻ để tái sử dụng code giữa các ứng dụng khác nhau trong monorepo. Để làm điều này, bạn có thể chạy lệnh sau:
`npx nx g @nrwl/react:lib mylib`
Thay `mylib` bằng tên của thư viện của bạn.

## Cài đặt Dependencies

Dựa vào các dependencies, bạn có thể sử dụng câu lệnh sau để cài đặt chúng:

```dependency
npm install @flaticon/flaticon-uicons@^2.4.0 @reduxjs/toolkit@^1.9.6 @tanstack/react-query@^4.35.3 axios@^1.5.1 crypto-js@^4.1.1 react-hook-form@^7.47.0 react-redux@^8.1.3 sass@^1.68.0 sonner@^1.0.3 zod@^3.22.2 --save

```

Và sau đó, cài đặt các devDependencies bằng câu lệnh sau:

```devDependency
npm install @tanstack/react-query-devtools@^4.35.3 axios-mock-adapter@^1.22.0 --save-dev

```

## Chạy ứng dụng

Cuối cùng, sau khi đã tạo xong ứng dụng và thư viện, bạn có thể chạy ứng dụng bằng cách chạy lệnh sau:
`npx nx serve myapp`

Lưu ý rằng bạn nên chạy các câu lệnh này trong thư mục gốc của dự án của bạn, nơi chứa file `package.json`. Ngoài ra, hãy đảm bảo rằng bạn đã cài đặt Node.js và npm trên máy của bạn.
