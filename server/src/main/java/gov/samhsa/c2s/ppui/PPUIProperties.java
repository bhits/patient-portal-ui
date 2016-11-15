package gov.samhsa.c2s.ppui;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
@ConfigurationProperties(prefix = "c2s.pp-ui")
@Data
public class PPUIProperties {

    private Branding branding;
    private Oauth2 oauth2;
    private SecuredApis securedApis;
    private UnsecuredApis unsecuredApis;

    @Data
    public static class Branding {
        private String name;
        private String initials;
        private String smallLogo;
        private String mediumLogo;
        private String largeLogo;
    }

    @Data
    public static class Oauth2 {
        private Client client;

        @Data
        public static class Client {
            @JsonIgnore
            private String clientId;
            @JsonIgnore
            private String secret;

            public byte[] getBase64BasicKey() {
                return (clientId + ":" + secret).getBytes(StandardCharsets.UTF_8);
            }
        }
    }

    @Data
    public static class SecuredApis {
        private String pcmApiBaseUrl;
        private String phrApiBaseUrl;
        private String tryPolicyApiBaseUrl;
        private String userInfo;
    }

    @Data
    public static class UnsecuredApis {
        private String plsApiBaseUrl;
        private String tokenUrl;
        private String verificationUrl;
        private String activationUrl;
        private String forgotPasswordUrl;
    }
}