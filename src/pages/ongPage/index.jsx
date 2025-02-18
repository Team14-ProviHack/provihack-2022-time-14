import CardOngOrSchool from "../../components/cardOngOrSchool";
import {
  CardsContainer,
  Title,
  CardsHeader,
  LoaderContainer,
  TextNotFound,
} from "./style";
import Header from "../../components/header";
import Filter from "../../components/filterHeader";
import { useEffect, useState } from "react";
import { getRequest, getRequestSearchFilter } from "../../services/requests";
import { Loader } from "../../components/Loader";
import Footer from "../../components/footer";

const OngPage = () => {
  const [loading, setLoading] = useState(true);
  const [ongs, setOngs] = useState({});

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");

  useEffect(() => {
    !nameSearch && getRequest(setOngs, setLoading, "ongs");
    !stateSearch && getRequest(setOngs, setLoading, "ongs");

  }, [nameSearch, stateSearch]);

  const onChangeCheck1 = (event) => {
    setCheck1(event.target.checked);
  };
  const onChangeCheck2 = (event) => {
    setCheck2(event.target.checked);
  };
  const onChangeCheck3 = (event) => {
    setCheck3(event.target.checked);
  };
  const onChangeCheck4 = (event) => {
    setCheck4(event.target.checked);
  };
  const onChangeCheck5 = (event) => {
    setCheck5(event.target.checked);
  };
  const onChangeNameSearch = (event) => {
    setNameSearch(event.target.value);
  };
  const onChangeStateSearch = (event) => {
    setStateSearch(event.target.value)
    getRequestSearchFilter(setOngs, setLoading, "ongs", null, event.target.value);
  };
  const onCLickSearch = () => {
    getRequestSearchFilter(setOngs, setLoading, "ongs", nameSearch);
  };

  const filters = [check1, check2, check3, check4, check5]
  const onChangeFilters = [onChangeCheck1, onChangeCheck2, onChangeCheck3, onChangeCheck4, onChangeCheck5]
  const filtersCheckbox = ['Reciclagem', 'Compostagem', 'Alimentos Orgânicos', 'Economia de água', 'Economia de energia']
  
  const listOngsFilter =
    ongs.ongsList && ongs.ongsList
      .filter((ong) => {
        return !check1 || ong.cause.includes("Reciclagem");
      })
      .filter((ong) => {
        return !check2 || ong.cause.includes("Compostagem");
      })
      .filter((ong) => {
        return !check3 || ong.cause.includes("Alimentos Orgânicos");
      })
      .filter((ong) => {
        return !check4 || ong.cause.includes("Economia de água");
      })
      .filter((ong) => {
        return !check5 || ong.cause.includes("Economia de energia");
      });

  return (
    <>
      <Header type="ong" />

      <Filter
        filtersCheckbox={filtersCheckbox}
        filters={filters}
        onChangeFilters={onChangeFilters}
        onChangeStateSearch={onChangeStateSearch}
        onChangeNameSearch={onChangeNameSearch}
        stateSearch = {stateSearch}
        nameSearch={nameSearch}
        page={"Oportunidades"}
        onCLickSearch={onCLickSearch}
      />
      {loading ?
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
        :
        listOngsFilter && listOngsFilter.length > 0 ?
          <>
            <CardsHeader>
              <Title>ONG's</Title>
              <span>{listOngsFilter.length} resultados</span>
            </CardsHeader>

            <CardsContainer type="ong">
              {listOngsFilter.map((item, index) => {
                return <CardOngOrSchool org={item} key={index} type="ong" />;
              })}
            </CardsContainer>
          </>
          :
          <TextNotFound>
            Infelizmente não encontramos nenhuma ONG cadastrada com esse perfil :({" "}
          </TextNotFound>
      }
      <Footer />
    </>
  );
};

export default OngPage;
