import AdminProductForm from "../../../components/AdminProductForm";

export default function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  return <AdminProductForm productId={params.productId} />;
}
