# ตะพาบน้ำไต้หวัน ฟาร์ม — เว็บไซต์พร้อมหลังบ้านแก้ไขได้คนเดียว

## สิ่งที่ได้
- เว็บ Astro (Static) โหลดเร็ว รองรับมือถือ
- หน้า: Home, About, Products (แยกหมวด), Knowledge, E-book ฟรี/ขาย, FAQ, Reviews, Contact, Policy
- หลังบ้านแก้ไขได้ที่ `/admin` (Decap CMS) อัปโหลดรูป/แก้ข้อความได้

## รันบนเครื่องตัวเอง
```bash
npm install
npm run dev
```
แล้วเปิด `http://localhost:4321`

## ขึ้นเว็บจริง (Netlify)
1) สร้าง GitHub repo และอัปโหลดไฟล์ทั้งหมด
2) Netlify → New site from Git → เลือก repo
3) Build command: `npm run build`
4) Publish directory: `dist`
5) เปิด Identity + Git Gateway
6) ตั้ง Registration เป็น **Invite only** และเชิญอีเมลคุณคนเดียว
7) เข้า `/admin` เพื่อแก้ข้อมูล

## ตั้งโดเมน tapabnamfarm.com
Netlify → Domain management → Add custom domain → ทำตาม DNS ที่ Netlify แนะนำ แล้วเปิด HTTPS
