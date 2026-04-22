import AdminProductForm from "../../../components/AdminProductForm";

export default async function EditProductPage(
  props: {
    params: Promise<{ productId: string }>;
  }
) {
  const params = await props.params;
  return <AdminProductForm productId={params.productId} />;
}
