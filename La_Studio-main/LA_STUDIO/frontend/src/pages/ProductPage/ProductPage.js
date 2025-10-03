// frontend/src/pages/ProductPage/ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import tất cả ảnh có trong src/assets/images để map bằng tên file
import img1 from '../../assets/images/image1.jpg';
import img2 from '../../assets/images/image2.jpg';
import img3 from '../../assets/images/image3.jpg';
import img4 from '../../assets/images/image4.jpg';
import img5 from '../../assets/images/image5.jpg';
import img6 from '../../assets/images/image6.jpg';
import img7 from '../../assets/images/image7.jpg';
import img8 from '../../assets/images/image8.jpg';
import img9 from '../../assets/images/image9.jpg';
import img10 from '../../assets/images/image10.jpg';

// map tên file => import
const imageMap = {
  'image1.jpg': img1,
  'image2.jpg': img2,
  'image3.jpg': img3,
  'image4.jpg': img4,
  'image5.jpg': img5,
  'image6.jpg': img6,
  'image7.jpg': img7,
  'image8.jpg': img8,
  'image9.jpg': img9,
  'image10.jpg': img10,
};

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setProduct(data);
          if (data.images && data.images.length) setSelectedImage(data.images[0]);
        } else {
          setProduct({ error: true });
        }
      })
      .catch(err => {
        console.error('Fetch product error', err);
        setProduct({ error: true });
      });
  }, [id]);

  if (!product) return <div>Đang tải sản phẩm...</div>;
  if (product.error) return <div>Sản phẩm không tìm thấy</div>;

  const handleAddToCart = async () => {
    // Lấy userId (tùy bạn đang lưu JWT/localStorage...), ở đây giả sử localStorage.userId
    const userId = localStorage.getItem('userId') || 'guest';
    try {
      const resp = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId: product.product_id,
          quantity: Number(quantity)
        })
      });
      const json = await resp.json();
      if (resp.ok) {
        alert('Đã thêm vào giỏ hàng');
        // nếu dùng redux, dispatch update cart count ở đây
      } else {
        alert('Lỗi khi thêm vào giỏ: ' + (json.error || json.message));
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi mạng khi thêm vào giỏ hàng');
    }
  };

  const images = product.images || []; // array tên file
  return (
    <div style={{ padding: 20 }}>
      <h2>{product.name}</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: 400 }}>
          {selectedImage ? (
            <img
              src={imageMap[selectedImage] || imageMap[images[0]]}
              alt={product.name}
              style={{ width: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: 300, background: '#eee' }} />
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {images.map((f, idx) => (
              <img
                key={idx}
                src={imageMap[f]}
                alt={f}
                onClick={() => setSelectedImage(f)}
                style={{ width: 60, height: 60, objectFit: 'cover', cursor: 'pointer', border: selectedImage === f ? '2px solid #333' : '1px solid #ddd' }}
              />
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <p>{product.description}</p>
          <p><strong>Giá:</strong> {product.price}</p>
          <p><strong>Kho:</strong> {product.stock}</p>

          <div style={{ marginTop: 16 }}>
            <label>Số lượng: </label>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: 80, marginLeft: 8 }} />
          </div>

          <div style={{ marginTop: 16 }}>
            <button onClick={handleAddToCart} style={{ padding: '8px 16px', fontSize: 16 }}>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
