FROM common_ocaml

WORKDIR /home/opam/server

ADD server/reader.opam .
RUN opam pin add -yn reader .

RUN opam --cli=2.1 list --readonly --external --no-depexts --resolve=reader --color=never | tee depexts

RUN opam install -y --deps-only --no-depexts reader

ADD server .
RUN rm -rf _build/
RUN opam exec dune build

FROM alpine:3.18
WORKDIR /app

COPY --from=0 /home/opam/server/_build/default/bin/ .

COPY --from=0 /home/opam/server/depexts .
RUN cat depexts | xargs apk --update add && rm -rf /var/cache/apk/*

EXPOSE 8080
ENV PRODUCTION=1
CMD ./server/main.exe
