# expo-offline-news-reader
📰 Offline News Reader

Ứng dụng đọc tin tức đơn giản, hoạt động cả khi offline.
Khi có mạng — fetch tin tức từ mock API, cache dữ liệu lại.
Khi mất mạng — lấy dữ liệu từ cache và hiển thị cho người dùng.

🚀 Công nghệ sử dụng

⚛️ [React Native] + [Expo]

🧠 TypeScript

📡 Fetch API

💾 [@react-native-async-storage/async-storage] — cache offline

🌐 [@react-native-community/netinfo] — kiểm tra trạng thái mạng

🧭 Tính năng

✅ Fetch dữ liệu khi online → cache bằng AsyncStorage

✅ Hiển thị tin khi offline → thông báo “Offline mode”

✅ Xem chi tiết bài viết (màn hình riêng)

🧰 Bộ lọc theo chuyên mục

📥 Cài đặt & chạy thử
# 1. Clone repo
git clone https://github.com/your-username/offline-news-reader.git

# 2. Cài dependencies
cd offline-news-reader
npm install
# hoặc yarn install

# 3. Chạy dự án Expo
npx expo start


⚡ Yêu cầu: Node.js >= 18, Expo CLI, máy ảo hoặc thiết bị thật có cài Expo Go.

📡 Cơ chế hoạt động

Khi mở app:

App kiểm tra trạng thái mạng qua NetInfo.

Nếu online:

Gọi mock API → lấy data → lưu AsyncStorage.

Nếu offline:

Lấy data đã cache → hiển thị.

Khi người dùng kéo refresh:

Nếu online → update cache + UI

Nếu offline → báo người dùng
