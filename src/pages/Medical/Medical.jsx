import React, { useState, useEffect } from 'react'
import style from './Medical.module.css'
import { Link } from 'react-router-dom'
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Card } from 'antd';

const Medical = () => {
    const { Search } = Input;
    const { Meta } = Card;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1677ff',
            }}
        />
    );
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const [data, setData] = useState([]);
    const [record, setRecord] = useState([]);
    const [valueInput, setValueInput] = useState('');

    const endpointUrl = 'https://query.wikidata.org/sparql';
    const sparqlQuery = "#defaultView:ImageGrid\n" +
        "SELECT ?drug ?drugLabel ?image\n" +
        "WHERE {\n" +
        "  ?drug wdt:P31/wdt:P279* wd:Q12140; # Instance of: Pharmaceutical product\n" +
        "  wdt:P18 ?image; # Hình ảnh\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
        "}\n" +
        "LIMIT 500\n"
    "";

    useEffect(() => {
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };

        fetch(fullUrl, { headers }).then(body => body.json()).then(json => {
            setData(json.results.bindings);
            setRecord(json.results.bindings.filter(value => {
                if (value.image && value.drug) {
                    return value;
                }
            }));
        });
    }, []);

    function renderData() {
        if (data) {
            return (
                record.map((item, index) => {
                    if (item.image && !item.drugLabel.value.includes('condom'))
                        return (
                            <Link to={item.drug.value} target='_blank' style={{
                                width: '48%',
                                marginBottom: '15px'
                            }}>
                                <Card
                                    key={index}
                                    hoverable
                                    cover={<img alt="example" src={item.image.value} />}
                                >
                                    <Meta title={item.drugLabel.value} description={item.drug.value} />
                                </Card>
                            </Link>
                        )
                })
            )
        }
    }
    const handleChange = (e) => {
        setValueInput(e.target.value);
    }
    const searchFilter = (e) => {
        setRecord(data.filter(val => val.drugLabel.value.toLowerCase().includes(valueInput)));
    }
    return (
        <div className={style.page}>
            <div className={style.containerAddData}>
                <HeaderBar />
                <Input placeholder="Basic usage" onChange={handleChange} />
                <button className={style.button} onClick={searchFilter}>Search</button>
                <div className={style.content}>
                    {renderData()}
                </div>
            </div>
        </div>
    )
}
export default Medical
