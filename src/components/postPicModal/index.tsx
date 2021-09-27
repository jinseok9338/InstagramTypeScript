// Need Container and Post page for the PostPicModal for the page.. I guess?? or just Modal

const PostPicModal = (visible: boolean) => (
        <div
            className={`overflow-auto \
              z-30 \
              h-5/6 \
              w-10/12 \
              mx-auto \
              top-20 \
              p-6 \
              border \
              rounded-xl \
              bg-white \
              text-left \
              fixed \
              ${visible ? 'visible' : 'invisible'}`}
      > </div> 
    )

export default PostPicModal