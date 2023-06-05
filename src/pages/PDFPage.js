import React, { useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  Svg,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { authContext } from "../context/Provider";
import { Badge } from "react-bootstrap";

export default function PDFPage() {
  const { user, loading } = useContext(authContext);

  const styles = StyleSheet.create({
    viewer: {
      height: "700px",
      width: "500px",
    },
    doc: {
      backgroundColor: "#E4E4E4",
    },
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    leftSection: {
      paddingLeft: "8px",
      minWidth: "30%",
      maxWidth: "30%",
      backgroundColor: "#ced9e6",
    },
    rightSection: {
      minWidth: "70%",
      maxWidth: "70%",
      backgroundColor: "azure",
    },
    name: {
      textAlign: "center",

      paddingTop: "8px",
      paddingBottom: "8px",
    },
  });
  return (
    <div className="tab-pane fade show px-3" id="nav-resume-pdf">
      <div className="my-4 shadow-sm">
        <Badge className="bg-light text-dark py-0 me-2">
          <AiFillEye size={25} />{" "}
        </Badge>
        <span>
          Still ongoing on this part. Aimed to work with context,
          firebase-firestore, and react-bootstrap while having an objective.
        </span>

        <span className="text-start mb-2 d-block fs-6 bg-success bg-opacity-10 text-dark">
          <strong>Version-2 Of This Project:</strong>
          <a
            target="_blank"
            className="ms-2"
            href="https://v-2-resume-builder.vercel.app"
          >
            v-2-resume-builder.vercel.app
          </a>
          <Badge className="ms-2 bg-success bg-opacity-25 text-dark">
            Target Tools:
          </Badge>
          Tailwind, Material UI, Next, Formik-Yup, Framer-motion
        </span>
      </div>
      <PDFViewer className="w-100 h-100 vh-100">
        <Document size="A4" style={styles.doc}>
          <Page size="A4" style={styles.page}>
            <View style={styles.leftSection}>
              <Profile_And_Contacts
                src={user.resume_pic}
                call=" 01833347848"
                email=" masumkhan081@gmail.com"
                github=" masumkhan081"
                web=" masumk081.web.app"
                address=" Rd-6, Shaqhporan, Sylhet"
                linkedin=" /masumkhan"
              />
              <Personal_Skills
                personal_skills={[
                  "Problem solving ability",
                  "Understanding user requirements",
                  "Logical & structured thinking",
                  "Good at communication skill",
                  "",
                ]}
              />
              <Interest
                interests={[
                  "Serverless architecture",
                  "Progressive web apps",
                  "API-first Development",
                  "Cryptography",
                  "Deep Learning",
                ]}
              />
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.name}>{user.resume_name}</Text>
              <Text style={styles.name}>{"And so on bla bla ..."}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

function Interest({ interests }) {
  // const { user, loading } = useContext(authContext);
  const styles = StyleSheet.create({
    parent: {
      marginTop: "20px",
    },
    perskill: {
      marginTop: "5px",
      fontSize: "11px",
      color: "blue",
      display: "flex",
      flexDirection: "column",
      rowGap: "4px",
    },
  });

  return (
    <div style={styles.parent}>
      <Text style={{ textAlign: "center" }}>Interest</Text>
      <View style={styles.perskill}>
        {interests.map((item, i) => {
          return <Text key={i}>{item}</Text>;
        })}
      </View>
    </div>
  );
}

//

function Personal_Skills({ personal_skills }) {
  //const { user, loading } = useContext(authContext);
  const styles = StyleSheet.create({
    parent: {
      marginTop: "20px",
    },
    perskill: {
      marginTop: "5px",
      fontSize: "11px",
      color: "blue",
      display: "flex",
      flexDirection: "column",
      rowGap: "4px",
    },
  });

  return (
    <div style={styles.parent}>
      <Text style={{ textAlign: "center" }}>Personal Skills</Text>
      <View style={styles.perskill}>
        {personal_skills.map((item, i) => {
          return <Text key={i}>{item}</Text>;
        })}
      </View>
    </div>
  );
}

//

function Profile_And_Contacts({ src }) {
  const styles = StyleSheet.create({
    container_contacts: {
      marginTop: "15px",
      display: "flex",
      flexDirection: "column",
      rowGap: "2px",
    },
    contact: {
      fontSize: "10px",
      fontWeight: "normal",
    },
    badge: {
      textDecoration: "underline",
      fontSize: "11px",
      fontWeight: "bold",
      margin: "5px",
    },
  });

  return (
    <div>
      <Image src={src} style={{ height: "170px", width: "165px" }} />

      <div style={styles.container_contacts}>
        <Text style={{ textAlign: "center" }}>Contacts</Text>

        <Text style={styles.contact}>
          <Text style={styles.badge}>Call:</Text>
          {"user.phone_number"}
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.badge}>Email:</Text>
          {"user.resume_email"}
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.badge}>Web:</Text>
          {"user.portfolio"}
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.badge}>Linkedin:</Text>
          {"user.linkedin"}
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.badge}>Address:</Text>
          {"user.address"}
        </Text>
      </div>
    </div>
  );
}
