import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Đang tải...</div>;
  if (product.error) return <div>Không tìm thấy sản phẩm</div>;

  const images = JSON.parse(product.images || "[]");
  const imgFile = images[0];

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={imageMap[imgFile]} alt={product.name} />
      <p>{product.description}</p>
      <p>Giá: {product.price}</p>
      {/* ... */}
    </div>
  );
}

export default ProductPage;