import { motion } from "framer-motion"
import Backdrop from "./Backdrop"

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
}

interface IProps {
    handleClose?: Function,
    handleSubmit?: Function,
    title: string,
    submitText?: string,
    content: Function | string
}

const Modal = ({ handleClose, handleSubmit, title, content, submitText }: IProps) => {

    const showContent = typeof content === 'function' ? content() : <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{content}</p>

    return (
        <Backdrop onClick={handleClose}>
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="modal"
                            style={{
                                width: 'clamp(50%, 700px, 90%)',
                                height: 'min(50%, 300px)',
                                margin: 'auto',
                                padding: '0 2rem',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}
                            drag
                            variants={dropIn}
                        >
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {title}
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {showContent}
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            handleClose()
                                        }}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            handleSubmit()
                                        }}
                                    >
                                        {submitText ?? 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
            </>
        </Backdrop >
    )
}

export default Modal