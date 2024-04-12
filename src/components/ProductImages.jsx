export default function ProductImages({ images }) {

  const NO_IMAGE = (
    <div className="__no-image">No image</div>
  )

  const HAS_IMAGE = (
    <div className="__product-images">
      {
        images.map((_image, _i_index) => {
          const { src, id } = _image;
          return <img key={ id } src={ _image.src } alt="" loading="lazy" />
        })
      }
    </div>
  )

  return <div className="product-builder__product-image">
    {
      ((_images) => {
        return (_images.length > 0 ? HAS_IMAGE : NO_IMAGE)
      })(images)
    }
  </div>
}