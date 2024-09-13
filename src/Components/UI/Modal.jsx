import Icon from "./Icon"
import Props from 'prop-types'

const Modal = ({title, toggleModal, children}) => {
  return (
      <>
          <div className="fixed inset-0">
              <div onClick={toggleModal} className="absolute -z-10 inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"></div>
              <div className="w-[90%] md:w-[480px] mx-auto bg-light border border-line mt-20 p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold font-sora">{title}</h3>
                      <div onClick={toggleModal} className="h-12 w-12 bg-secondary flex-center rounded-full">
                          <Icon>close</Icon>
                      </div>
                  </div>

                  <div className="my-4">
                      {children}
                  </div>
              </div>
      </div>
      </>
  )
}

Modal.propTypes = {
    title: Props.string.isRequired,
    toggleModal: Props.func.isRequired,
    children: Props.node.isRequired
}

export default Modal