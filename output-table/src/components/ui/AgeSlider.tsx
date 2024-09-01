import React, { useState } from "react"
import { Flex, Button, Row, Col, Slider } from "antd"
interface IAgeSliderProps {
    onSearch: (value: number[]) => void // Колбэк при фильтрации данных
}

// Дропдаун фильтра выбора возраста
function AgeSlider({ onSearch }: IAgeSliderProps) {
    const [ageRange, setAgeRange] = useState([20, 50]); // Начальный диапазон
    return (
        <Flex gap={10} vertical style={{ padding: 10, width: 200 }}>
            <Button onClick={() => onSearch(ageRange)}>
                Поиск
            </Button>
            <div>
                <Row align="middle">
                    <Col>
                        <span>От</span>
                    </Col>
                    <Col flex="1">
                        <Slider
                            min={0}
                            value={ageRange}
                            onChange={setAgeRange}
                            max={100}
                            range
                            defaultValue={[20, 50]} />
                    </Col>
                    <Col>
                        <span>До</span>
                    </Col>
                </Row>
            </div>
        </Flex>
    )
}
export default AgeSlider