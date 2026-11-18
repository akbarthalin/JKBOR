# JK.BOR — Website Joki Mobile Legends

## Isi website
- Joki Akun dan Joki Gendong (tanpa Joki Classic).
- Price list Season 42 sesuai gambar yang diberikan.
- Estimasi harga per bintang dan pilihan Full Grading.
- Form order dengan pengiriman detail ke WhatsApp admin.
- Nomor WhatsApp admin: 6282283910021.
- Halaman pembayaran QRIS dengan gambar QRIS yang diberikan.
- Desain responsif untuk HP dan desktop.

## Upload ke GitHub
1. Ekstrak ZIP.
2. Upload seluruh isi folder ke root repository GitHub.
3. Pastikan `index.html`, `style.css`, `app.js`, dan `qris-jkbor.png` ada di root.
4. Hubungkan repository ke Vercel lalu Deploy. Pilih framework `Other`; build command dan output directory dikosongkan.

## Catatan harga
Tarif rank diasumsikan sebagai harga per bintang berdasarkan format price list. Joki Akun: Epic Rp4.000, Legend Rp5.000, Mythic Rp10.000, Honor Rp10.000, Glory Rp12.000, Immortal Rp16.000. Joki Gendong: Epic Rp7.000, Legend Rp7.000, Mythic Rp12.000, Honor Rp12.000, Glory Rp15.000, Immortal Rp20.000. Full Grading: Joki Akun Rp100.000, Joki Gendong Rp120.000. Jika sistem tarif yang dimaksud berbeda, ubah konfigurasi di `app.js`.

## Keamanan pembayaran
QRIS ditampilkan dari gambar yang kamu berikan. Pelanggan perlu memeriksa nama merchant `JK.BOR MLBB, GAMING` pada aplikasi pembayaran sebelum membayar. Website ini belum memverifikasi status pembayaran secara otomatis.
