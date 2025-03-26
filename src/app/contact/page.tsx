"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { CalendarDays, Clock, Mail, MapPinHouse } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const bg = "/djene.png";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response?.ok) {
        toast.success("Connexion réussie", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      router.push("/");
      message.success("Message envoyé avec succès !");
    } catch (error) {
      message.error("Erreur lors de l'envoi du message !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:-mb-36">
      <ToastContainer />
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="w-full h-[8rem] lg:h-[15rem] bg-center bg-cover"
      ></div>
      <div className="max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto p-8 grid grid-cols-1 gap-4 lg:grid-cols-5 items-center h-auto lg:h-[40rem] lg:gap-0 lg:transform -translate-y-20 lg:-translate-y-36">
        <div className="bg-primary-default text-gray-200 px-6 py-10 md:py-16 rounded-lg h-full col-span-2">
          <h2 className="text-lg md:text-2xl mb-2 font-semibold md:font-bold text-white">
            COORDONNÉES
          </h2>
          <hr className="border-b-2 border-accent-default w-12" />
          <div className="w-full lg:w-2/3 mt-4 md:mt-6 flex flex-col gap-5">
            <p className="text-sm mb-4 flex gap-3 items-center">
              {" "}
              <MapPinHouse /> Bamako, Mali
            </p>
            <p className="text-sm font-semibold flex gap-3 items-center">
              <CalendarDays /> Lundi - Vendredi
            </p>
            <p className="text-sm mb-4 flex gap-3 items-center">
              <Clock />
              09h00 - 18h00
            </p>
            <p className="flex gap-3 items-center">
              <Mail /> nkodonteam@gmail.com
            </p>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-3 bg-gray-100 p-4 md:p-10 mt-12 md:mt-0 rounded-lg h-full border-2 border-primary-default lg:transform lg:-translate-x-14">
          <h2 className="text-xl md:text-3xl font-semibold">Contactez-nous</h2>
          <p className="text-sm mt-2 md:mt-4">
            Remplissez le formulaire ci-dessous pour nous contacter.
          </p>

          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4 mt-6"
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Veuillez entrer votre nom !" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Entrez votre nom" />
            </Form.Item>

            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre numéro de téléphone !",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Entrez votre numéro de téléphone"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre adresse e-mail !",
                },
                {
                  type: "email",
                  message: "L'adresse e-mail n'est pas valide !",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Entrez votre email"
              />
            </Form.Item>

            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Veuillez entrer votre message !" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Votre message" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full mt-5"
                size="large"
              >
                Envoyer le message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
