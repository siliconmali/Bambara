import { Form, Input, Button, message, AutoCompleteProps } from "antd";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";



interface NkoFormProps {
   mode: "add" | "edit";
   initialValues?: any;
   onWordSaved: () => void;
   onCancel?: () => void;
 }
const AddNkoWordForm = ({mode, initialValues, onCancel, onWordSaved}: NkoFormProps) => {
    const [form] = Form.useForm();
     const [dictionary, setDictionary] = useState<{ word: string }[]>([]);
     const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
     const [isDuplicate, setIsDuplicate] = useState(false);
     const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
     const [filteredSuggestions, setFilteredSuggestions] = useState<
       AutoCompleteProps["options"]
     >([]);
     const [inputValue, setInputValue] = useState<string>("");
   
     useEffect(() => {
       if (mode === "edit" && initialValues) {
         form.setFieldsValue(initialValues);
       } else {
         form.resetFields();
       }
     }, [mode, initialValues]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
   //   if (mode === "add" && isDuplicate) {
   //     message.error("Ce mot existe déjà dans le dictionnaire.");
   //     return;
   //   }
 
     setLoading(true);
     try {
       const response = await fetch("/api/nko", {
         method: mode === "add" ? "POST" : "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(values),
       });
 
       const result = await response.json();
       if (!response.ok)
         throw new Error(
           mode === "add" ? "Ajout échoué" : "Mise à jour échouée"
         );
 
       toast.success(
         mode === "add"
           ? "Mot ajouté avec succès"
           : "Mot mis à jour avec succès",
         {
           position: "top-right",
           autoClose: 3000,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           hideProgressBar: false,
         }
       );
 
       form.resetFields();
       onWordSaved();
     } catch (error) {
       message.error("Une erreur s'est produite.");
     } finally {
       setLoading(false);
       if (mode === "edit" && onCancel) onCancel();
     }
   };

  return (
   <div className="max-w-6xl mx-auto p-4  h-[60vh] overflow-hidden">
      <ToastContainer />
      {mode === "edit" && (
        <h2 className="className=" text-lg font-bold mb-4>
          ✏️ Modifier le mot
        </h2>
      )}

      <div className="h-full overflow-y-auto p-2">
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Mot en N'Ko"
        name="nko"
        rules={[{ required: true, message: "Veuillez entrer le mot en N'Ko" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Traduction en Bambara"
        name="bam"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Traduction en Français"
        name="fren"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Traduction en Anglais"
        name="eng"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} >
        {mode === "add" ? "Ajouter le mot" : "Mettre à jour"}
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};

export default AddNkoWordForm;