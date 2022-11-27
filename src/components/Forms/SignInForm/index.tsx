import { useState } from "react";
import { Button } from "../../Controllers/Button";
import { FooterButton } from "../../Controllers/FooterButton";
import { Input } from "../../Controllers/Input";
import { Form, Title, Footer, Error } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../routes/AuthRoutes";
import * as yup from "yup";
import { Formik } from "formik";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";

type SignInScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "SignIn">;

const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email("E-mail precisa ser válido")
        .required("O e-mail é obrigatório"),
    password: yup
        .string()
        .required("A senha é obrigatória")
});

const initialValues = {
    email: "",
    password: ""
};

export function SignInForm() {
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation<SignInScreenNavigationProp>();

    function handleSignIn(values: { email: string, password: string }) { 
        setIsLoading(true);

        auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => Alert.alert("Sucesso", "Usuário autenticado com sucesso"))
            .catch(() => Alert.alert("Falha", "Não foi possível realizar o login"))
            .finally(() => setIsLoading(false))
        }

    function handleForgotPassword() {
        // auth()
        //     .sendPasswordResetEmail(values.email)  
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => handleSignIn(values)}
            validationSchema={loginValidationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                <Form>
                    <Title>Entrar</Title>
                    <Input placeholder="E-mail" onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email}/>
                    {
                        touched.email && !!errors.email &&
                        <Error>{errors.email}</Error>
                    }
                    <Input placeholder="Senha" secureTextEntry onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} />
                    {
                        touched.password && !!errors.password &&
                        <Error>{errors.password}</Error>
                    }
                    {/* @ts-ignore */}
                    <Button title="Entrar" onPress={handleSubmit} isLoading={isLoading} disabled={isValid} />

                    <Footer>
                        <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate("Register")} />
                        <FooterButton title="Esqueci a senha" icon="email" onPress={handleForgotPassword} />
                    </Footer>
                </Form>
            )}
        </Formik>
    );
}