package com.github.sdurell.budgeting_app.config;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class TwoDecimalSerializer extends JsonSerializer<BigDecimal>{
    private static final DecimalFormat df = new DecimalFormat("0.00");

    @Override
    public void serialize(BigDecimal value, JsonGenerator gen, SerializerProvider serializers)
                throws IOException{
            gen.writeString(df.format(value));
        }
}
