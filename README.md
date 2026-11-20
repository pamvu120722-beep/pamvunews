> **Nếu dùng Netlify:** đọc file `README_NETLIFY.md` (cấu hình Netlify có sẵn trong bản ZIP này).

# PamVu English Ledger

Website đọc tin tức tiếng Anh và luyện Reading theo phong cách editorial, lấy cảm hứng từ cách bố cục báo điện tử như The Guardian nhưng có nhận diện riêng.

## 1. Có những gì?

- **The Daily**: RSS cập nhật từ VnExpress International, The Guardian, CNA và DW; lọc theo Việt Nam, bóng đá, kinh tế, thế giới, công nghệ, đời sống; tìm theo tiêu đề, lọc B1/B2/C1.
- **Reading Studio**: 7 bài luyện đọc gốc (không phải tin thời sự); cho phép dán bài tiếng Anh do bạn được quyền sử dụng.
- **Từ điển khi đọc**: chạm/bấm vào một từ, xem nghĩa tiếng Anh (Free Dictionary API khi mạng cho phép), IPA (nếu API trả về), nghĩa tiếng Việt có sẵn cho một số từ, tự nhập nghĩa và lưu.
- **Flashcards**: lật thẻ, phát âm tiếng Anh, đánh dấu mastered.
- **Đọc và luyện tập**: giọng đọc trình duyệt (Web Speech API), bài quiz cho các bài tự biên soạn, ghi chú/tóm tắt bằng tiếng Anh.
- **My Progress**: mục tiêu 10/15/20/30 phút, streak, số bài đã đọc, biểu đồ 7 ngày, bookmark và export JSON.
- **Responsive**: máy tính, tablet và điện thoại; dữ liệu học tập lưu ở `localStorage` của trình duyệt.

## 2. Chạy thử ngay, không cần cài gì

Mở file **`demo-offline.html`** bằng Chrome, Edge hoặc Safari.

Đây là **bản xem thử offline**: giao diện và chức năng học từ vựng/flashcard/chấm bài đều dùng được. Vì không có phần máy chủ RSS, khu vực The Daily hiển thị **Practice Edition** gồm bài tự biên soạn, KHÔNG phải tin mới. Trình duyệt vẫn cần Internet nếu muốn tra định nghĩa từ máy chủ từ điển hoặc tải webfont.

## 3. Chạy bản đầy đủ với RSS tin tức thật

**Yêu cầu:** Node.js 20+ và tài khoản Cloudflare (gói miễn phí thường đủ cho nhu cầu học cá nhân). Cần Internet để cài đặt gói và lấy tin.

```bash
# Mở thư mục pamvu-english-ledger
npm install
npm run dev
```

Mở đường dẫn local mà Wrangler hiển thị (thường là `http://localhost:8787`).

Máy chủ có endpoint `GET /api/news?topic=all` và `GET /api/news?topic=football` (các chủ đề khác: `vietnam`, `economy`, `world`, `technology`, `culture`). Máy chủ lấy XML RSS và trả JSON về frontend, tránh vấn đề CORS khi đọc nguồn tin từ browser. Nếu một nguồn tạm lỗi, nguồn còn lại vẫn có thể trả về tin.

## 4. Đưa lên Internet tự cập nhật

```bash
npx wrangler login
npm run deploy
```

Cloudflare sẽ in ra URL website của bạn dạng `https://pamvu-english-ledger.<tên-tài-khoản>.workers.dev` (địa chỉ thực tế phụ thuộc Cloudflare). Truy cập URL đó để sử dụng; không cần tự chạy máy tính liên tục.

**Lưu ý quan trọng:** Nếu chỉ upload `index.html` lên GitHub Pages, Netlify, hoặc dùng bản `demo-offline.html`, RSS sẽ **không** tự cập nhật. Để lấy tin qua RSS cần triển khai cùng worker `src/worker.js` hoặc thay bằng máy chủ API tương đương. Trong bản online, tin được làm mới khi mở trang hoặc bấm Refresh, với cache CDN Netlify khoảng 3 phút (có thể khác nếu triển khai trên Cloudflare); khi tab còn mở, website cũng tự làm mới mục đang đọc mỗi 5 phút. Đây **không phải stream thời gian thực từng giây**.

## 5. Cấu trúc dự án

```text
pamvu-english-ledger/
├── public/
│   ├── index.html       # Giao diện trang
│   ├── styles.css       # Thiết kế responsive
│   ├── practice.js      # 7 bài luyện đọc gốc + quiz
│   ├── app.js           # Search, Reader, Từ vựng, Flashcards, Progress
│   └── favicon.svg
├── src/
│   └── worker.js        # Proxy RSS theo danh sách nguồn cố định
├── demo-offline.html    # Bản dùng thử độc lập 1 file
├── package.json
├── wrangler.toml
└── README.md
```

## 6. Nguồn tin và quyền sử dụng

Các RSS đã tham chiếu:

- VnExpress International: https://e.vnexpress.net/rss — các kênh Home, Sport, Business, Tech, Travel.
- The Guardian: https://www.theguardian.com/help/feeds — các mục Football, Business, World, Technology.
- CNA: https://www.channelnewsasia.com/rss — các kênh chính thức, theo danh mục.
- DW: https://www.dw.com/en/more-dw/rss/s-31500 — English news.

Website này **không tự lấy và sao chép nguyên bài báo**, không bỏ qua paywall. Trang chỉ hiển thị headline, phần mô tả ngắn mà feed cung cấp, ảnh nguồn khi có và link mở bài tại nhà xuất bản. Người dùng có thể dán nội dung đọc mà mình có quyền sử dụng vào Studio để học sâu.

**Các điều khoản RSS có thể giới hạn mục đích cá nhân/phi thương mại** (đặc biệt Guardian, CNA, VnExpress). Nếu muốn mở rộng thành dịch vụ công khai/thu phí/quảng cáo/đăng lại nội dung, cần tự đánh giá lại điều khoản và xin phép phù hợp. Không dùng mẫu này để khẳng định quyền thương mại từ nhà báo. Nguồn RSS có thể thay đổi hoặc bị chặn tùy hạ tầng mạng, chính sách nhà xuất bản và thời điểm.

## 7. Dữ liệu cá nhân và giới hạn

- Từ vựng, lịch sử đọc, ghi chú, bookmark lưu tại `localStorage` của từng trình duyệt, không đồng bộ thiết bị. Dùng **Export my progress** để tải file sao lưu JSON.
- Nút phát âm dùng chức năng đọc văn bản của trình duyệt, một số thiết bị/giọng đọc có thể không hỗ trợ đầy đủ.
- Free Dictionary API: https://dictionaryapi.dev/ (mạng có thể giới hạn, khi không trả lời vẫn nhập nghĩa và lưu từ được).
- Cấp độ B1/B2/C1 của tin RSS chỉ là **ước lượng tự động đơn giản theo độ dài từ**, không phải xếp hạng CEFR chính thức.
- Bài viết gốc trong Practice Studio có quiz được biên soạn thủ công. Tin RSS chỉ có câu hỏi tự phản ánh, **không tạo ra đáp án hiểu bài giả**.
- Thời lượng đọc tin RSS chỉ tính theo phần tóm tắt hiển thị trên website; không đo thời gian đọc bài ở ngoài trang.
- Phiên bản phát hành này không có đăng nhập, không có API AI trả phí, không có tự dịch cả bài.

## 8. Tùy biến thêm

- Đổi logo, typography, palette: `public/index.html` và `public/styles.css`.
- Thêm nguồn tin RSS đã kiểm tra pháp lý và kỹ thuật: `FEEDS` và `BY_TOPIC` trong `src/worker.js`.
- Thêm bài luyện đọc gốc kèm quiz: `public/practice.js`.
- Chỉnh danh sách nghĩa từ vựng mặc định: `GLOSSARY` trong `public/app.js`.
- Chỉnh tên website Cloudflare trong `wrangler.toml`.

> **Ghi chú triển khai:** gói mã đã được kiểm tra cú pháp JavaScript. Chưa có xác nhận rằng mọi RSS đáp ứng được trên mọi ISP Việt Nam hoặc website đã được triển khai trên một URL Internet. Khi chạy online, màn hình sẽ hiển thị `LIVE PUBLISHER RSS` nếu có tin từ RSS, hoặc `PRACTICE EDITION` nếu chưa kết nối được.
