"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, message, Form, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "../apis/fetchApi";

const Page: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      const response = await signUp(values);
      message.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      message.error("Registration failed! Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
      <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
        Đăng Kí
      </div>
      <Form onFinish={handleSubmit}>
        <div className="flex flex-row w-full gap-2">
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="Họ" className="h-[40px]" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Tên" className="h-[40px]" />
          </Form.Item>
        </div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Tên đăng nhập" className="h-[40px]" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Số điện thoại" className="h-[40px]" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input placeholder="Email" className="h-[40px]" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-[40px] uppercase"
          >
            Đăng Kí
          </Button>
        </Form.Item>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn đã có tài khoản?</span>
          <Link className="text-beamin cursor-pointer" href={"/login"}>
            Đăng nhập
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default Page;
