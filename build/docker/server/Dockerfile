FROM common_ocaml

WORKDIR /home/opam/server

ADD server/reader.opam .
RUN opam pin add -yn reader . && \
    opam depext reader && \
    opam install --deps-only reader

ADD server .
RUN sudo chown -R opam:nogroup . && \
    opam config exec make build && \
    opam depext -ln reader > depexts

FROM alpine:3.18
WORKDIR /app
COPY --from=0 /home/opam/server/_build/default/bin/ .

COPY --from=0 /home/opam/server/depexts depexts
RUN cat depexts | xargs apk --update add && rm -rf /var/cache/apk/*

EXPOSE 8080
ENV PRODUCTION=1
CMD ./server/main.exe
