import os
import sys
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class PDFReglamento(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="A4")
        
        # Cargar fuentes del sistema con soporte Unicode completo
        fonts_dir = r"C:\Windows\Fonts"
        self.add_font("CustomFont", "", os.path.join(fonts_dir, "arial.ttf"))
        self.add_font("CustomFont", "B", os.path.join(fonts_dir, "arialbd.ttf"))
        self.add_font("CustomFont", "I", os.path.join(fonts_dir, "ariali.ttf"))
        if os.path.exists(os.path.join(fonts_dir, "arialbi.ttf")):
            self.add_font("CustomFont", "BI", os.path.join(fonts_dir, "arialbi.ttf"))

    def header(self):
        logo_path = r"C:\laragon\www\clubdelingenio\club_ingenio_logo.jpg"
        if os.path.exists(logo_path):
            try:
                self.image(logo_path, 15, 11, 20)
            except Exception:
                pass
        
        self.set_xy(38, 12)
        self.set_font("CustomFont", "B", 8)
        self.set_text_color(180, 83, 9)  # Áureo noble
        self.cell(0, 4, "OFICINA ESPAÑOLA DE PATENTES Y MARCAS (OEPM) | LEY 17/2001 DE MARCAS", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        self.set_xy(38, 17)
        self.set_font("CustomFont", "B", 13)
        self.set_text_color(15, 23, 42)  # Azul noche
        self.cell(0, 5.5, "REGLAMENTO OFICIAL DE USO DE LA MARCA", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        self.set_xy(38, 23.5)
        self.set_font("CustomFont", "I", 9)
        self.set_text_color(100, 116, 139)
        self.cell(0, 4, "Signo Distintivo, Anagrama e Identidad Oficial «CLUB DEL INGENIO»", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        # Línea separadora dorada
        self.set_draw_color(217, 119, 6)
        self.set_line_width(0.7)
        self.line(15, 31, 195, 31)
        self.set_y(34)

    def footer(self):
        self.set_y(-18)
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.4)
        self.line(15, self.get_y(), 195, self.get_y())
        
        self.set_y(-14)
        self.set_font("CustomFont", "", 8)
        self.set_text_color(100, 116, 139)
        self.cell(140, 5, "Club del Ingenio - Don Guillermo Tudela Soler (Valencia) | Homologación OEPM", align="L")
        self.cell(40, 5, f"Página {self.page_no()}/{{nb}}", align="R")

    def chapter_title(self, label):
        self.ln(2.5)
        self.set_fill_color(248, 250, 252)
        self.set_text_color(15, 23, 42)
        self.set_font("CustomFont", "B", 10)
        self.set_draw_color(203, 213, 225)
        self.set_line_width(0.3)
        self.cell(0, 7, f"  {label.upper()}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, fill=True, border="B")
        self.ln(2)

    def article_title(self, label):
        self.set_font("CustomFont", "B", 9.2)
        self.set_text_color(30, 41, 59)
        self.cell(0, 5, label, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(0.5)

    def body_p(self, text):
        self.set_font("CustomFont", "", 8.6)
        self.set_text_color(30, 41, 59)
        self.multi_cell(0, 4.2, text, align="J")
        self.ln(1.5)

def build_pdf():
    pdf = PDFReglamento()
    pdf.set_margins(15, 12, 15)
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # Preámbulo
    pdf.body_p(
        "El presente documento técnico y normativo constituye el Reglamento Oficial de Uso del signo distintivo "
        "y marca «CLUB DEL INGENIO», redactado de conformidad con los preceptos de la Ley 17/2001, de 7 de diciembre, "
        "de Marcas, ante la Oficina Española de Patentes y Marcas (OEPM). Regula las condiciones de titularidad, "
        "licencia, explotación telemática, control de calidad y régimen sancionador de la marca."
    )

    # CAPÍTULO I
    pdf.chapter_title("Capítulo I. Disposiciones Generales y Titularidad")
    
    pdf.article_title("Artículo 1. Objeto del Reglamento")
    pdf.body_p(
        "El presente Reglamento tiene por objeto fijar las condiciones obligatorias de uso, difusión pública, "
        "defensa legal y explotación del signo distintivo «CLUB DEL INGENIO» (en adelante, la Marca), garantizando "
        "que cualquier reproducción telemática o física responda a los más altos estándares de rigor lógico, ético y pedagógico."
    )

    pdf.article_title("Artículo 2. Identificación del Titular Legítimo")
    pdf.body_p(
        "La titularidad única, legítima y exclusiva sobre la Marca, anagrama y submódulos vinculados corresponde a:\n"
        "• Titular: Don Guillermo Tudela Soler / Conectividad y Comunicaciones, S.L.\n"
        "• Domicilio legal y técnico: Valencia, Comunidad Valenciana, España.\n"
        "• Plataforma telemática oficial: https://clubdelingenio.com\n"
        "• Representación: Órgano de Dirección y Administración de Club del Ingenio."
    )

    pdf.article_title("Artículo 3. Elementos Gráficos y Distintivos Amparados")
    pdf.body_p(
        "La protección de la Marca ampara de forma indisociable los siguientes elementos:\n"
        "1. Denominación verbal: «CLUB DEL INGENIO».\n"
        "2. Lemas institucionales: «Sede de la Lógica, el Ingenio y la Estimulación Cognitiva» / «El Club de las Mentes Inquietas».\n"
        "3. Anagrama y distintivo heráldico: Escudo geométrico nobiliario orlado en gradiente áureo (#f59e0b / #b45309), "
        "laberinto octogonal interior representativo de la mente y la deducción analítica, y núcleo poliédrico cian (#38bdf8) "
        "que simboliza el ingenio puro y la concentración sin distracciones.\n"
        "4. Módulos y submódulos oficiales: Top-Sudoku, Sudoku Arena, Cálculo Táctico, Léxico Táctico, Deducción Lógica, "
        "Nonogramas del Club, Cubo de Rubik 3D, Damas del Club, Bridge del Club y Puzles del Club."
    )

    # CAPÍTULO II
    pdf.chapter_title("Capítulo II. Clasificación Internacional de Productos y Servicios (Niza)")
    
    pdf.article_title("Artículo 4. Clases del Nomenclátor Amparadas")
    pdf.body_p(
        "De conformidad con el Arreglo de Niza relativo a la Clasificación Internacional de Productos y Servicios, "
        "la Marca ampara prioritariamente las siguientes actividades:"
    )
    
    pdf.body_p(
        "• CLASE 9: Programas de ordenador y software descargable; aplicaciones informáticas para dispositivos móviles, "
        "tabletas y navegadores web; software lúdico, didáctico y educativo; videojuegos interactivos de lógica, matemáticas "
        "y gimnasia mental; bases de datos y algoritmos de validación matemática y verificación anti-trampas."
    )
    pdf.body_p(
        "• CLASE 41: Servicios de esparcimiento, entretenimiento y juegos interactivos en línea a través de redes telemáticas; "
        "organización y dirección de torneos, campeonatos, ligas de eSports de la mente y cuadros de honor oficiales (Salón de la Fama); "
        "servicios formativos y de estimulación cognitiva para jóvenes, adultos y categoría senior/máster (65+); publicación de retos y acertijos."
    )
    pdf.body_p(
        "• CLASE 42: Servicios de software como servicio (SaaS); diseño, desarrollo, hospedaje y mantenimiento técnico de plataformas "
        "digitales de lógica y destreza mental; auditoría de juego limpio y certificación técnica de algoritmos de generación procedural."
    )

    # CAPÍTULO III
    pdf.chapter_title("Capítulo III. Principios Rectores y Estándares de Calidad")

    pdf.article_title("Artículo 5. Principio de Calidad y «Manifiesto Zero-Ads»")
    pdf.body_p(
        "El distintivo «CLUB DEL INGENIO» es garantía de excelencia y respeto irrenunciable hacia el usuario. "
        "Cualquier entidad o plataforma autorizada a exhibir el distintivo deberá asumir obligatoriamente los siguientes preceptos:"
    )

    zero_ads_lines = [
        "1. Experiencia libre de anuncios invasivos (Zero-Ads): Prohibición expresa de intercalar publicidad intrusiva, "
        "vídeos obligatorios o ventanas emergentes (pop-ups) que rompan la concentración o degraden el disfrute del usuario.",
        "2. Privacidad ética y acceso fluido (Zero-Login): Prioridad de acceso directo al juego sin imponer barreras obligatorias "
        "de registro ni formularios innecesarios, cumpliendo escrupulosamente con el RGPD y la legislación europea de privacidad.",
        "3. Juego Limpio y Neutralidad Algorítmica (Fair Play): En toda modalidad competitiva o duelo 1v1, garantía absoluta de "
        "igualdad matemática mediante la entrega de semillas aleatorias idénticas y trazabilidad sin favoritismos."
    ]
    pdf.body_p("\n".join(zero_ads_lines))

    pdf.article_title("Artículo 6. Normas Gráficas y Fidelidad Visual")
    pdf.body_p(
        "El anagrama, logotipo y tipografías corporativas deberán reproducirse manteniendo estrictamente los vectores, "
        "proporciones y gamas cromáticas oficiales. Queda terminantemente prohibido cualquier estiramiento asimétrico, "
        "alteración de colores corporativos o superposición de marcas comerciales ajenas sin licencia por escrito."
    )

    # CAPÍTULO IV
    pdf.chapter_title("Capítulo IV. Régimen de Autorizaciones y Licencias")

    pdf.article_title("Artículo 7. Sujetos con Derecho de Uso")
    pdf.body_p(
        "Podrán hacer uso del distintivo «CLUB DEL INGENIO»:\n"
        "a) El Titular legítimo y sus empresas autorizadas.\n"
        "b) Centros de enseñanza, colegios, universidades y academias de ajedrez o matemáticas en convenio de difusión pedagógica.\n"
        "c) Asociaciones culturales, clubes sociales y organizadores de ligas de deportes de la mente previamente homologados."
    )

    pdf.article_title("Artículo 8. Condiciones de Licencia")
    pdf.body_p(
        "Toda autorización o licencia concedida a terceros tendrá carácter no exclusivo, intransferible y revocable en "
        "cualquier momento en caso de detectarse incumplimiento de los estándares fijados en este Reglamento."
    )

    # CAPÍTULO V
    pdf.chapter_title("Capítulo V. Infracciones y Régimen Sancionador")

    pdf.article_title("Artículo 9. Infracciones Graves y Uso Fraudulento")
    pdf.body_p(
        "Se considerará uso fraudulento o ilícito de la Marca:\n"
        "1. Asociar el distintivo a plataformas o juegos de apuestas con dinero real, mecánicas de casino (gambling) o microtransacciones abusivas.\n"
        "2. Deformar el escudo o emplearlo en contextos que lesionen el prestigio, la honorabilidad o la identidad del Club.\n"
        "3. Simular homologación, patrocinio o vinculación oficial sin contar con autorización expresa del Titular."
    )

    pdf.article_title("Artículo 10. Medidas Correctoras y Acciones Legales")
    pdf.body_p(
        "El Titular requerirá al infractor el cese en un plazo máximo de cinco (5) días hábiles. De persistir el incumplimiento, "
        "se procederá a la revocación de la autorización y al ejercicio inmediato de las acciones civiles y penales amparadas "
        "por la Ley 17/2001 de Marcas (acciones de cesación, remoción, indemnización de daños y perjuicios y publicación de sentencia)."
    )

    # CAPÍTULO VI
    pdf.chapter_title("Capítulo VI. Jurisdicción y Entrada en Vigor")

    pdf.article_title("Artículo 11. Entrada en Vigor")
    pdf.body_p(
        "El presente Reglamento entrará en vigor a partir del momento de su formalización y presentación formal ante "
        "la Oficina Española de Patentes y Marcas (OEPM)."
    )

    pdf.article_title("Artículo 12. Sumisión Jurisdiccional")
    pdf.body_p(
        "Para la resolución de cualquier duda, litigio o discrepancia en torno a la interpretación o aplicación del presente "
        "Reglamento, las partes se someten de forma expresa e improrrogable a la jurisdicción de los Juzgados y Tribunales "
        "de la ciudad de Valencia (España), con renuncia a cualquier otro fuero que pudiera corresponderles."
    )

    # BLOQUE DE FIRMA FORMAL
    pdf.ln(3)
    pdf.set_draw_color(203, 213, 225)
    pdf.set_line_width(0.4)
    pdf.line(15, pdf.get_y(), 195, pdf.get_y())
    pdf.ln(4)

    pdf.set_font("CustomFont", "B", 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(110, 5, "Por la Titularidad de «CLUB DEL INGENIO»:", new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(70, 5, "DILIGENCIA OEPM / EXPEDIENTE:", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="R")

    pdf.ln(2)
    pdf.set_font("CustomFont", "B", 10.5)
    pdf.cell(110, 5, "Don Guillermo Tudela Soler", new_x=XPos.RIGHT, new_y=YPos.TOP)
    
    pdf.set_font("CustomFont", "I", 8)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(70, 5, "[ Espacio reservado para sello de registro ]", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="R")

    pdf.set_font("CustomFont", "", 8.8)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(110, 4.5, "Director y Titular Fundador", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(110, 4.5, "Conectividad y Comunicaciones, S.L.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(110, 4.5, "Valencia (España), a 31 de octubre de 2026", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    output_path = r"C:\laragon\www\clubdelingenio\reglamento_uso_marca_oepm.pdf"
    pdf.output(output_path)
    print(f"PDF generado exitosamente en: {output_path}")

if __name__ == "__main__":
    build_pdf()
