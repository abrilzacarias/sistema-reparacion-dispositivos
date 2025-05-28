import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import { createContext, forwardRef, useState } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export const OpenContext = createContext()

const ModalFormTemplate = forwardRef(
  ({ children,  ...props }, ref) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
      setOpen(!open)
    }

    return (
      <OpenContext.Provider value={{ open, setOpen }}>
        <Button
          ref={ref}
          type="button"
          variant={props.variant}
          className={props.className}
          onClick={handleOpen}
          disabled={props.disabled}
        >
          {props.icon && <props.icon className="h-4 w-4" />}
          {props.label}
        </Button>
        <Credenza open={open} onOpenChange={setOpen}>
          <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle className="text-primary mb-2">
                  {props.title}
                </CredenzaTitle>
                <CredenzaDescription>{props.description}</CredenzaDescription>
              </CredenzaHeader>
            <CredenzaBody>{children}</CredenzaBody>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <Button type="submit" className="sr-only">Save changes</Button>
              </CredenzaClose>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      </OpenContext.Provider>
    )
  }
)
ModalFormTemplate.displayName = "ModalFormTemplate"

export default ModalFormTemplate
export { ModalFormTemplate }  