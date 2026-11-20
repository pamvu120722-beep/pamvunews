# HƯỚNG DẪN TRIỂN KHAI PAMVU ENGLISH LEDGER LÊN GITHUB + NETLIFY

**Bản Auto 5 phút:** khi bạn đang mở mục The Daily, trình duyệt kiểm tra nguồn tin khoảng mỗi 5 phút; khi quay lại tab sau hơn 5 phút, trang cũng kiểm tra lại. Nút Refresh yêu cầu tin mới ngay. **Không phải livestream tức thì**: nguồn RSS do báo xuất bản, có thể chậm, tạm lỗi hoặc thay đổi.

## A. Chuẩn bị

1. Tải và giải nén file ZIP này. Đừng tải nguyên ZIP lên GitHub để Netlify sử dụng.
2. Mở thư mục `PamVu_English_Ledger_Netlify_Auto5min`. Bạn sẽ thấy `public`, `src`, `netlify`, `package.json`, `netlify.toml`, `README.md`, ...
3. Có tài khoản GitHub (https://github.com) và Netlify (https://app.netlify.com). Không cần cài Git/Node nếu chỉ thao tác trên trình duyệt.

## B. Tạo GitHub repository

1. Đăng nhập GitHub. Mở https://github.com/new (hoặc bấm nút `+` trên thanh trên cùng, chọn `New repository`).
2. Ở ô `Repository name`, nhập `pamvu-english-ledger`.
3. Ở `Description` (tùy chọn), nhập `English news reading and vocabulary practice`.
4. Chọn `Private` (bạn có thể dùng Netlify Git integration khi cấp quyền) hoặc `Public` nếu muốn chia sẻ mã nguồn.
5. **KHÔNG** tích chọn `Add a README file`, `.gitignore` hay license, vì ZIP đã có file riêng.
6. Nhấn `Create repository`.
7. Repository trống thường hiển thị liên kết `uploading an existing file`. Nhấp vào đó. Nếu không thấy: vào tab `Code` > `Add file` > `Upload files`.
8. Trong Finder (macOS), vào **bên trong** thư mục đã giải nén. Chọn các mục bên trong (Command+A) và kéo vào vùng upload của GitHub. Không kéo **thư mục bao ngoài** nếu sau khi upload các tệp lại bị nằm sâu hơn một cấp.
9. Chờ các file và folder hiện lên. Ở ô commit message ghi `Initial PamVu English Ledger website`. Chọn `Commit directly to the main branch`, nhấn `Commit changes`.
10. Kiểm tra tại đầu danh sách file của GitHub thấy các mục **cùng cấp** sau: `netlify.toml`, `package.json`, `public/`, `netlify/`, `src/`. Bên trong `netlify/functions/` phải có `news.js`.

## C. Kết nối GitHub với Netlify

1. Mở https://app.netlify.com và đăng nhập.
2. Chọn `Add new project` (hoặc `Add new site`) > `Import an existing project` / `Import from Git`.
3. Chọn GitHub; cấp quyền cho Netlify truy cập repository. Nếu thấy danh sách giới hạn, hãy chọn `Only select repositories` > `pamvu-english-ledger`.
4. Chọn repository `pamvu-english-ledger` và branch `main`.
5. Cấu hình: `Base directory` để **trống**, `Build command`: `npm run build`, `Publish directory`: `public`, `Functions directory`: `netlify/functions`. File `netlify.toml` đã định nghĩa các giá trị này và URL redirect.
6. Nhấn `Deploy` / `Deploy pamvu-english-ledger`.
7. Chờ phần `Deploys` thông báo `Published`. Vào URL dạng `https://ten-du-an.netlify.app`.

## D. Kiểm tra tin thật

1. Mở `https://ten-du-an.netlify.app/api/news?topic=football` (đổi `ten-du-an`). Nếu trả JSON với `items` có dữ liệu và `isLive: true`, backend RSS đang hoạt động.
2. Thử `?topic=vietnam`, `?topic=economy`, `?topic=world`. Nếu có `failedFeeds` > 0, một số nguồn có thể lỗi nhưng các nguồn khác vẫn hoạt động.
3. Vào trang chính, mục The Daily: tin thật sẽ có nhãn `LIVE PUBLISHER RSS`. Bấm `Refresh` để lấy lại tin tức. Nếu nguồn RSS lỗi hoàn toàn, trang hiển thị `PRACTICE EDITION` (bài đọc mẫu, không phải tin mới).
4. Nếu URL `/api/news?...` trả `404`: đảm bảo `netlify.toml` và `netlify/functions/news.js` đúng vị trí; kiểm tra `Deploys` và `Functions` trong Netlify.
5. Nếu trang trắng: kiểm tra `public/index.html`, `Build command`, `Publish directory`, xem thông báo lỗi trong `Deploy log`.

## E. Để website tự cập nhật

- **Tin mới không phải commit mới trên GitHub.** GitHub lưu code, Netlify Function gọi RSS khi người dùng mở trang/cập nhật.
- Bản này tự yêu cầu dữ liệu mới khoảng **5 phút/lần khi đang mở The Daily**, và kiểm tra khi quay lại tab nếu đã qua 5 phút. Backend hỗ trợ cache ngắn: trình duyệt ~1 phút, Netlify CDN ~3 phút cho request bình thường; nút Refresh dùng `fresh=...` để yêu cầu trực tiếp.
- Nếu muốn xem mỗi lần có tin mới nhanh hơn, vẫn phụ thuộc thời điểm nhà báo xuất bản trên RSS. Không có push websocket/livestream.
- Nếu muốn thay giao diện hoặc sửa chức năng: vào GitHub > mở file > biểu tượng cây bút (`Edit`) > sửa > `Commit changes`. Netlify sẽ tự build và đăng phiên bản code mới sau commit (khác với việc tin tức tự cập nhật).

## Tệp quan trọng

```text
REPOSITORY ROOT/
├── netlify.toml
├── package.json
├── public/
│   ├── index.html
│   ├── app.js
│   ├── practice.js
│   ├── styles.css
│   └── favicon.svg
├── netlify/
│   └── functions/
│       └── news.js
├── src/
│   └── worker.js
└── README_NETLIFY.md
```

**Lưu ý bản quyền:** chỉ sử dụng tiêu đề/tóm tắt RSS được nhà xuất bản cung cấp và mở toàn bài trên website gốc; kiểm tra điều khoản của từng nguồn trước khi sử dụng thương mại. **Dữ liệu học** như từ vựng, flashcard, lịch sử được lưu cục bộ trong trình duyệt và không tự đồng bộ giữa điện thoại và máy tính.
