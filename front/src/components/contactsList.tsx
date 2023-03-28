import { UserContext } from "@/contexts/userContext";
import {
  Box,
  Flex,
  IconButton,
  List,
  ListItem,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import ContactCard from "./contactCard";
import { MdPersonAdd } from "react-icons/md";
import ContactForm from "./contactForm";
import ConfirmDelete from "./confirmDelete";

const ContactsList = () => {
  const { contactList } = useContext(UserContext);
  const {
    isOpen: isContactFormOpen,
    onClose: onContactFormClose,
    onOpen: onContactFormOpen,
  } = useDisclosure();

  const {
    isOpen: isConfirmDeleteOpen,
    onClose: onConfirmDeleteClose,
    onOpen: onConfirmDeleteOpen,
  } = useDisclosure();

  const { setContact, contact } = useContext(UserContext);
  const [toEdit, setToEdit] = useState<boolean>(false);

  return (
    <>
      <Box m={"0 auto"} w={"90%"} minW={300} mt={"106px"}>
        <Flex direction={"column"} gap={2}>
          <IconButton
            variant={"ghost"}
            color={useColorModeValue("green.800", "green.300")}
            bg={useColorModeValue("green.200", "green.200")}
            icon={<MdPersonAdd />}
            border={"2px solid transparent"}
            aria-label="Add contact"
            _hover={{
              transform: "scale(1.1)",
              border: "2px solid #22543d",
            }}
            alignSelf={"flex-end"}
            onClick={() => {
              onContactFormOpen();
              setContact(null);
            }}
            marginRight={4}
            px={10}
            size={"lg"}
          />

          <List
            zIndex={1}
            spacing={4}
            minH={500}
            maxH={500}
            overflowY={"scroll"}
            p={"10px 10px 20px 10px"}
            sx={{
              "::-webkit-scrollbar": {
                width: "6px",
              },
              "::-webkit-scrollbar-track": {
                width: "6px",
              },
              "::-webkit-scrollbar-thumb": {
                background: "blue.200",
                borderRadius: "24px",
              },
              "@media (min-width: 768px)": {
                maxHeight: "600px",
              },
            }}
          >
            {contactList.map((el) => (
              <ListItem key={el.id}>
                <ContactCard
                  contact={el}
                  onContactFormOpen={onContactFormOpen}
                  setToEdit={setToEdit}
                  onConfirmDeleteOpen={onConfirmDeleteOpen}
                />
              </ListItem>
            ))}
          </List>
        </Flex>
      </Box>
      <ConfirmDelete isOpen={isConfirmDeleteOpen} onClose={onConfirmDeleteClose} toDelete={true} />
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={onContactFormClose}
        toEdit={toEdit}
        setToEdit={setToEdit}
      />
    </>
  );
};

export default ContactsList;
